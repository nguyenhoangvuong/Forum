import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "jquery/dist/jquery.min.js";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CommentModel, ResponseDataType } from "../../../models/export";
import { CommentServices } from "../../../services/export";
import { commentActions } from "../../../store/actions/export";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
var $ = require("jquery");

type Props = {
  state: any;
};

const Comment: React.FC<Props> = (props) => {
  const [isCheck, setIsCheck] = useState(false);
  const [statusCallApi, setStatusCallApi] = useState(0);

  const comments = useAppSelector((state) => state.comment.listComment);
  $(document).ready(function () {
    $("#commentList").DataTable();
    $("#commentList").DataTable();
  });

  let postId = useParams().postID;
  const dispatch = useAppDispatch();

  function handleSubmit(comment: CommentModel) {
    let commentFotmat = {
      _id: comment._id,
      UserId: comment.UserId,
      PostId: comment.PostId,
      Content: comment.Content,
      ReplyToUserId: "",
      ReplyToUserName: "",
      ParentId: "",
      Active: comment.IsActive === 0 ? 1 : 0,
    };

    CommentServices.createUpdateComment(commentFotmat)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        if (response.Code === 200) {
          toast.success(response.Message.Message);
          setIsCheck(!isCheck);
        } else {
          toast.error(response.Message.Message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // useEffect(() => {
  //   $("#commentList").DataTable();
  // }, [comments, isCheck]);

  useEffect(() => {
    if (postId) {
      CommentServices.getCommentByPostID(postId, 1, 20, null)
        .then(async (res) => {
          let response: ResponseDataType = await res.data;
          if (response.Code === 200) {
            setStatusCallApi(response.Code);
          }
          dispatch(commentActions.setListComment(response.Data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [postId, isCheck, dispatch]);

  return (
    <div className="d-flex flex-column w-100 position-relative pt-3">
      {statusCallApi === 200 && comments?.length > 0 ? (
        <table
          id="commentList"
          className="table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>UserName</th>
              <th>Post Title</th>
              <th>Content</th>
              <th>QuantityLike</th>
              <th>CreateDate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((comment: any) => {
              let listSubComment = comment.subComments;
              let listCmtSub = <></>;
              if (listSubComment?.length > 0) {
                listCmtSub = listSubComment.map((comment: any) => (
                  <tr key={"comment_sub_" + comment._id}>
                    <td>{comment.UserName}</td>
                    <td>{props.state.postTitle}</td>
                    <td>{comment.Content}</td>
                    <td>{comment.QuantityLike}</td>
                    <td>{comment.CreateDate}</td>
                    <td className="text-center">
                      <span
                        className="btn btn-info p-1 rounded-3 fs-5"
                        onClick={() => handleSubmit(comment)}
                      >
                        {comment.IsActive === 1 ? "Reject" : "Confirm"}
                      </span>
                    </td>
                  </tr>
                ));
              }
              return (
                <>
                  <tr key={"comment_parent_" + comment._id}>
                    <td>{comment.UserName}</td>
                    <td>{props.state.postTitle}</td>
                    <td>{comment.Content}</td>
                    <td>{comment.QuantityLike}</td>
                    <td>{comment.CreateDate}</td>
                    <td className="text-center">
                      <span
                        className="btn btn-info p-1 rounded-3 fs-5"
                        onClick={() => handleSubmit(comment)}
                      >
                        {comment.IsActive === 1 ? "Reject" : "Confirm"}
                      </span>
                    </td>
                  </tr>
                  {listCmtSub}
                </>
              );
            })}
          </tbody>
        </table>
      ) : statusCallApi === 200 && comments.length === 0 ? (
        <div className="p-5 d-flex justify-content-center align-content-center">
          No Comment
        </div>
      ) : (
        <div className="p-5 d-flex justify-content-center align-content-center">
          Loading...
        </div>
      )}
      <div className="w-100 d-flex justify-content-end pb-3">
        <NavLink
          to="/admin/post"
          className="btn btn-info mt-3 d-block"
          style={{ width: "200px" }}
        >
          Back
        </NavLink>
      </div>
    </div>
  );
};

Comment.propTypes = {};
export default Comment;
