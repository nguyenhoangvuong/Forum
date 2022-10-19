import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LikeModel, PostModel, ResponseDataType } from "../../models/export";
import { CommentServices, LocalStoreServices } from "../../services/export";
import { commentActions } from "../../store/actions/export";
import { useAppDispatch } from "../../store/app/hooks";
import { RootState } from "../../store/app/store";
import { PostState } from "../../store/slice/export";
import "../../style/contentPostDetail.css";
import { DEFAULT_PAGE_SIZE_5, MOVE, NONE } from "../../utils/constants";
import { CommentComponent } from "../export";
import { FacebookShareButton, TwitterShareButton } from "react-share";

type Props = {
  postState: PostState;
  globalState: RootState;
  setChange: Function;
  setIsCheck: Function;
};

export const ContentDetailComponent: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  let { postState, globalState, setChange } = props;
  let post: PostModel = postState.postSelected;
  let content = post.Content;
  let listComment = globalState.comment.listComment;
  let user = LocalStoreServices.getCurrentUser();
  let pagingTotal = Math.round(post.QuantityParentComment / DEFAULT_PAGE_SIZE_5);

  let url = useParams();
  useEffect(() => {
    getListComment();
  }, []);

  function getListComment(pageNumber: number = 1) {
    CommentServices.getCommentByPostID(post._id, pageNumber)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        dispatch(commentActions.setListComment(response.Data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClickLike() {
    let likeData = post.UserLiked === 1 ? 2 : 1;
    let param = new LikeModel(
      post.IdLike,
      String(user.userId),
      post._id,
      "",
      likeData
    );

    CommentServices.createUpdateLike(param).then(async (res) => {
      let response = await res.data;
      if (response.Data.Code === 1) {
        toast.success(response.Data.Desc);
        setChange();
      }
    });
  }

  function handleCommentPagingNavigate(index: number) {
    getListComment(index);
    setPage(index);
  }

  function movePagingButtonClick(type: string) {
    switch (type) {
      case MOVE.PREV:
        if (page > 1) {
          let prevPage = page - 1;
          getListComment(prevPage);
          setPage(prevPage);
        }
        break;
      case MOVE.NEXT:
        if (page < pagingTotal) {
          let nextPage = page + 1;
          getListComment(nextPage);
          setPage(nextPage);
        }
        break;

      default:
        break;
    }
  }
  let listKeyword = post.Keywords.split(",");
  let urlFullOfPost =
    window.location.protocol + "/" + window.location.host + "/" + post.PostUrl;

  return (
    <>
      {content !== NONE && url.postName ? (
        <div className="content position-relative opacity-100">
          <div className="ml-auto w-25 text-right">
            <button
              className={`btn btn-post-vote`}
              onClick={handleClickLike}
              disabled={user.userId ? false : true}
            >
              <span>
                <svg
                  width="1em"
                  stroke="currentColor"
                  fill={post.UserLiked === 1 ? "currentColor" : "lightblue"}
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M2 9h3v12H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zm5.293-1.293l6.4-6.4a.5.5 0 0 1 .654-.047l.853.64a1.5 1.5 0 0 1 .553 1.57L14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H8a1 1 0 0 1-1-1V8.414a1 1 0 0 1 .293-.707z"></path>
                  </g>
                </svg>
              </span>
              <span style={{ fontSize: "12px", fontWeight: "unset" }}>
                <span
                  style={{
                    color: post.UserLiked === 1 ? "currentColor" : "lightblue",
                  }}
                >
                  {post.QuantityLike} Like
                </span>
              </span>
            </button>
          </div>
          <div>{parse(content)}</div>
          {/* social */}
          <div className="post-footer post-footer--rada mt-4">
            <div className="d-flex flex-column">
              <div className="d-flex">
                <img
                  className="mr-2"
                  width="30"
                  height="30"
                  src="./assets/image/rada-animate.svg"
                  alt="logo"
                ></img>
                <div className="d-flex flex-column mt-1 mb-3">
                  <span className="logo--text">FORUM</span>
                  <span className="post-footer--quote">
                    The DAO-based Angellist for Blockchain
                  </span>
                </div>
              </div>
              <div className="post-footer--social">
                <FacebookShareButton
                  url={urlFullOfPost}
                  hashtag={post.Keywords}
                  className="Demo__some-network__share-button"
                >
                  <span className="btn-social brand--facebook btn-default">
                    <span>
                      <i className="fa-brands fa-facebook"></i>
                    </span>
                    <span>Facebook</span>
                  </span>
                </FacebookShareButton>

                <TwitterShareButton
                  title={post.Title}
                  url={urlFullOfPost}
                  hashtags={listKeyword}
                >
                  <span className="btn-social brand--twitter btn-default">
                    <span>
                      <i className="fa-brands fa-twitter"></i>
                    </span>
                    <span>Twitter</span>
                  </span>{" "}
                </TwitterShareButton>
              </div>
            </div>
          </div>

          {/* comment */}
          <CommentComponent
            postID={post._id}
            listComment={listComment}
            getListComment={getListComment}
            pagingTotal={pagingTotal}
            page={page}
            setPage={handleCommentPagingNavigate}
            movePage={movePagingButtonClick}
            totalComment={postState.postSelected.QuantityComment}
          />
        </div>
      ) : (
        <div className="content position-relative opacity-100 text-center w-100 opacity-75">
          Select article to see details
        </div>
      )}
    </>
  );
};
