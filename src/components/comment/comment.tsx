import { useEffect, useState } from "react";
import {
  ChildrenCommentModel,
  CommentModel,
  CreateUpdateComment,
  LikeModel,
} from "../../models/export";
import { CommentServices, LocalStoreServices } from "../../services/export";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MOVE } from "../../utils/constants";
import './comment.css'

type Props = {
  postID: string;
  listComment: CommentModel[];
  getListComment: Function;
  pagingTotal: number
  page: number;
  setPage: Function;
  movePage: Function;
  totalComment: number;
};

export const CommentComponent: React.FC<Props> = (props) => {
  const [postComment, setPostComment] = useState("");
  const [repComment, setRepComment] = useState("");
  const [showReply, setShowReply] = useState("");
  const [open, setOpen] = useState(false);

  let {
    listComment,
    postID,
    getListComment,
    pagingTotal,
    page,
    setPage,
    movePage,
    totalComment,
  } = props;
  let user = LocalStoreServices.getCurrentUser();
  useEffect(() => {
    getListComment();
  }, [postID]);
  

  function handleSubmit(type: string) {
    switch (type) {
      case "comment":
        let param = new CreateUpdateComment(
          "",
          String(user.userId),
          postID,
          postComment
        );
        CommentServices.createUpdateComment(param).then(async (res) => {
          let response = await res.data;
          if (response.Code === 200) {
            toast.success(
              response.Message.Message +
                ", Bình luận sẽ được hiển thị khi admin duyệt !"
            );
          } else {
            toast.error(response.Message.Message);
          }
          if (response.Data.Code === 1) {
            getListComment();
            setPostComment("");
          }
        });
        break;
      case "rep":
        break;
    }
  }

  function openReply(id: string) {
    setShowReply(id);
    setOpen(!open);
  }

  function handleReply(
    repToUser: string,
    repToUserName: string,
    parentID: string
  ) {
    let param = new CreateUpdateComment(
      "",
      String(user.userId),
      postID,
      repComment,
      repToUser,
      repToUserName,
      parentID
    );
    CommentServices.createUpdateComment(param).then(async (res) => {
      let response = await res.data;
      if (response.Code === 200) {
        toast.success(
          response.Message.Message +
            ", Bình luận sẽ được hiển thị khi admin duyệt !"
        );
      } else {
        toast.error(response.Message.Message);
      }
      if (response.Data.Code === 1) {
        getListComment();
        setRepComment("");
      }
    });
  }

  let navigate = useNavigate();
  function handleCheckLogin() {
    if (user.userId === null) {
      navigate("/authen");
    }
  }

  return (
    <>
      <div className="section section-comments">
        <div className="section-header d-flex justify-content-between">
          <div className="section-title">
            <span className="mr-2">
              <i className="fa-solid fa-comments"></i>
            </span>
            <span className="text-color-title">{`${totalComment} Bình luận`}</span>
          </div>
        </div>
        <div className="section-body">
          <div className="comment-form d-flex align-items-center">
            <div
              className="avatar-sm mr-3"
              id="avatarLogin"
              style={{ display: "none" }}
            >
              <img src={String(user.image)} alt={String(user.fullName)}></img>
            </div>
            <textarea
              className="comment-textarea"
              id="comment-textarea"
              rows={1}
              title="Để lại bình luận của bạn"
              placeholder={
                user.userId === ""
                  ? "Đăng nhập để bình luận"
                  : "Bình luận của bạn"
              }
              readOnly={user.userId === "" ? true : false}
              data-metatip="true"
              value={postComment}
              onClick={() => handleCheckLogin()}
              onChange={(e) => setPostComment(e.target.value)}
            ></textarea>
            <button
              className="btn comment-btn ml-2"
              onClick={() => handleSubmit("comment")}
              disabled={user.userId === null ? true : false}
            >
              Gửi
            </button>
          </div>
          {/* list */}
          <div className="comment-list">
            <div className="comments-list-item">
              {/* show list comment */}
              {listComment?.map((comment: CommentModel) => (
                <>
                  <div className="comment">
                    <div className="a"></div>
                    <div className="avatar-sm">
                      <img src={comment.ImageUser} alt={comment.UserName}></img>
                    </div>
                    <div className="comment-main">
                      <div className="comment-header d-flex">
                        <span className="metadata user-wallet--title">
                          {comment.UserName}
                        </span>
                        <span className="metadata metadata-date text-xs text-color-desc">
                          <span className="metadate-value">
                            {comment.CreateDate}
                          </span>
                        </span>
                      </div>
                      <div className="comment-text mt-1">
                        <p className="comment-text-p">{comment.Content}</p>
                      </div>
                      <div className="comment-footer">
                        <div className="d-flex align-items-center">
                          {/* <button
                            className="btn btn-post-vote"
                            disabled={user.userId === "" ? true : false}
                            onClick={() => handleLike(true, comment._id)}
                          >
                            <span>
                              <svg
                                width="1em"
                                stroke="currentColor"
                                fill="currentColor"
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
                            <span
                              style={{ fontSize: "12px", fontWeight: "unset" }}
                            >
                              {comment.QuantityLike} Like
                            </span>
                          </button> */}
                          <span
                            onClick={() => openReply(comment._id)}
                            className="btn py-1 rounded btn-reply-comment bg-light"
                          >
                            <span
                              className="mr-2"
                              style={{ fontSize: "12px", color: "#858a91" }}
                            >
                              <i className="fa fa-reply"></i>
                            </span>
                            <span
                              style={{ fontSize: "12px", color: "#858a91" }}
                            >
                              Reply
                            </span>
                          </span>
                        </div>
                        {showReply !== "" &&
                          showReply === comment._id &&
                          open === true && (
                            <>
                              <div className="d-flex align-items-center">
                                <textarea
                                  className="comment-textarea"
                                  id="comment-textarea"
                                  rows={1}
                                  title="Để lại bình luận của bạn"
                                  placeholder={
                                    user.userId === ""
                                      ? "Đăng nhập để bình luận"
                                      : "Bình luận của bạn"
                                  }
                                  readOnly={user.userId === "" ? true : false}
                                  value={repComment}
                                  onChange={(e) =>
                                    setRepComment(e.target.value)
                                  }
                                  onClick={() => handleCheckLogin()}
                                  style={{ height: "38px !important" }}
                                ></textarea>
                                <button
                                  className="btn comment-btn ml-2"
                                  onClick={() =>
                                    handleReply(
                                      comment.UserId,
                                      comment.UserName,
                                      comment._id
                                    )
                                  }
                                  disabled={user.userId === null ? true : false}
                                >
                                  Trả lời
                                </button>
                              </div>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="comment-reply-form" id="Reply">
                    <div className="comment-trail"></div>
                    <textarea
                      className="comment-textarea"
                      id="comment-textarea"
                      rows={1}
                      title="Để lại bình luận của bạn"
                      placeholder={
                        user.userId === ""
                          ? "Đăng nhập để bình luận"
                          : "Bình luận của bạn"
                      }
                      readOnly
                      style={{ height: "38px !important" }}
                    ></textarea>
                    <button
                      className="btn comment-btn ml-2"
                      disabled={user.userId === null ? true : false}
                    >
                      Trả lời
                    </button>
                  </div>
                  {comment.subComments?.map((sub: ChildrenCommentModel) => (
                    <>
                      <div className="comment comment_reply">
                        <div className="comment-trail"></div>
                        <div className="avatar-sm">
                          <img src={sub.ImageUser} alt={sub.UserName}></img>
                        </div>
                        <div className="comment-main">
                          <div className="comment-header d-flex">
                            <span className="metadata user-wallet--title">
                              {sub.UserName}
                            </span>
                            <span className="metadata metadata-date text-xs text-color-desc">
                              <span className="metadate-value">
                                {sub.CreateDate}
                              </span>
                            </span>
                          </div>
                          <div className="comment-text mt-1">
                            <p className="comment-text-p">{sub.Content}</p>
                          </div>
                          <div className="comment-footer">
                            <div className="d-flex align-items-center">
                              {/* <button
                                className="btn btn-post-vote"
                                disabled={user.userId === "" ? true : false}
                              >
                                <span>
                                  <svg
                                    width="1em"
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    height="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g>
                                      <path
                                        fill="none"
                                        d="M0 0h24v24H0z"
                                      ></path>
                                      <path d="M2 9h3v12H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zm5.293-1.293l6.4-6.4a.5.5 0 0 1 .654-.047l.853.64a1.5 1.5 0 0 1 .553 1.57L14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H8a1 1 0 0 1-1-1V8.414a1 1 0 0 1 .293-.707z"></path>
                                    </g>
                                  </svg>
                                </span>
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "unset",
                                  }}
                                >
                                  Like
                                </span>
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ))}
            </div>
            {pagingTotal > 0 && (
              <div className="pagination">
                <span
                  onClick={() => movePage(MOVE.PREV)}
                  className={page === 1 ? "hiddenButton" : ""}
                >
                  &laquo;
                </span>
                {[...Array(pagingTotal + 1)].map(
                  (item, index) =>
                    index > 0 && (
                      <>
                        <span
                          key={index}
                          onClick={() => setPage(index)}
                          className={index === page ? "active" : ""}
                        >
                          {index}
                        </span>
                      </>
                    )
                )}
                <span
                  onClick={() => movePage(MOVE.NEXT)}
                  className={page === pagingTotal ? "hiddenButton" : ""}
                >
                  &raquo;
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
