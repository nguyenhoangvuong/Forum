import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "jquery/dist/jquery.min.js";
import {
  CategoryModel,
  PostModel,
  ResponseDataType,
} from "../../../models/export";
import { CategoryServices, PostServices } from "../../../services/export";
import { adminActions, postActions } from "../../../store/actions/export";
import { useAppDispatch } from "../../../store/app/hooks";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../../store/app/store";
import {
  DEFAULT_PAGE_SIZE_5,
  KEY_PRESS,
  MOVE,
  PAGE_SIZES,
} from "../../../utils/constants";
import "./post.css";

var $ = require("jquery");

type Props = {
  globalState: RootState;
};

const Post: React.FC<Props> = (props) => {
  const { globalState } = props;
  const dispatch = useAppDispatch();
  const [isCheck, setIsCheck] = useState(false);
  const [allSubCate, setAllSubCate] = useState<any>();
  const [subSelected, setSubSelected] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_5);
  const [totalRows, setTotalRows] = useState(DEFAULT_PAGE_SIZE_5);
  const listPageSize = PAGE_SIZES;

  // const [listAllPost, setListAllPost] = useState<any>([]);
  const [listAllPostBonus, setListAllPostBonus] = useState<any>([]);

  let listAllPost = globalState.post.listAllPost;

  let pagingTotal: any= Math.ceil(
    totalRows / pageSize
  );
  if (pagingTotal === 0) {
    pagingTotal += 1;
  } else if (pagingTotal === undefined) {
    pagingTotal += 1;
  }
  pagingTotal += 1;

  // $(document).ready(function () {
  //   if(listAllPost.length > 0) {
  //     $("#post").DataTable();
  //     $("#category").DataTable();
  //   }
  // });

  useEffect(() => {
    CategoryServices.getAllSubCate().then(async (res) => {
      let response: ResponseDataType = await res.data;
      setAllSubCate(response.Data);
    });

    if (subSelected === "") {
      // PostServices.getAllPostBySubCateID(subSelected, page)
      //   .then(async (res) => {
      //     let response: ResponseDataType = await res.data;
      //     // setListAllPostBonus(
      //     //   // response.Data.filter(
      //     //   //   (item: any) => item.PostCategoryId === subSelected
      //     //   // )
      //     //   response.Data
      //     // );
      //     // setListAllPost(response.Data);
      //     dispatch(postActions.setListAllPost(response.Data));
      //     // pagingTotal = Math.round(listAllPost.length / DEFAULT_PAGE_SIZE_5)
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      callData(subSelected);
    }
  }, []);
  // }, [isCheck, subSelected]);

  useEffect(() => {
    if ($.fn.dataTable?.isDataTable("#post")) {
      $("#post").DataTable();
    } else {
      $("#post").DataTable({
        paging: false,
        info: false,
        searching: false,
      });
    }
  }, []);

  useEffect(() => {
    callData(subSelected);
  }, [subSelected, pageSize, page]);

  function handleRemove(id: string) {
    PostServices.deletePost(id)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        if (response.Code === 200) {
          toast.success(response.Message.Message);
        } else {
          toast.error(response.Message.Message);
        }
        setIsCheck(!isCheck);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEdit(post: PostModel) {
    dispatch(adminActions.setUpdatePost(post));
  }

  function handleAddNew() {
    dispatch(adminActions.setUpdatePost(new PostModel()));
  }

  function handleErrorImg(e: any) {
    e.target.src = "/assets/image/no-image.png";
  }

  function handleChangeSelectSub(e: any) {
    setPage(1);
    setSubSelected(e.target.value);
  }

  function movePage(type: string) {
    switch (type) {
      case MOVE.PREV:
        if (page > 1) {
          let prevPage = page - 1;
          setPage(prevPage);
        }
        break;
      case MOVE.NEXT:
        if (page < pagingTotal) {
          let nextPage = page + 1;
          setPage(nextPage);
        }
        break;

      default:
        break;
    }
  }

  function handleSetPage(index: number) {
    setPage(index);
  }

  function callData(select: string = "") {
    PostServices.getAllPostBySubCateID(select, page, pageSize)
      .then(async (res) => {
        let response = await res.data;
        // console.log('response', response)
        dispatch(postActions.setListAllPost(response.Data.ListPost));
        setTotalRows(response.Data.TotalRows);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handlePageSizeChange(e: any) {
    setPage(1);
    setPageSize(Number(e.target.value));
  }

  function handleSearch(e: any) {
    let content = e.target.value;
    let key = e.key;
    if (key === KEY_PRESS.ENTER) {
      setSubSelected("");
      setPage(1);
      PostServices.searchByTitle(content)
        .then(async (res) => {
          let response = await res.data;
          if (response.Data) {
            dispatch(postActions.setListAllPost(response.Data.ListPost));
            setTotalRows(response.Data.TotalRows);
          } else {
            callData();
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <>
      <div className="d-flex flex-column w-100 position-relative">
        {listAllPost.length >= 0 ? (
          <>
            <div className="table-header-container post-custom">
              <div>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(e)}
                >
                  {listPageSize.map((item) => (
                    <>
                      <option key={"list_page_size_" + item} value={item}>
                        {item + " items"}
                      </option>
                    </>
                  ))}
                </select>
                <NavLink
                  to="/admin/post/add-post"
                  type="button"
                  className="btn btn-primary w-auto"
                  onClick={handleAddNew}
                >
                  <i className="fa fa-plus pr-2"></i> Add New
                </NavLink>
                {allSubCate && (
                  <select
                    name="sub_post"
                    value={subSelected}
                    id=""
                    className="select-subcate"
                    onChange={(e) => handleChangeSelectSub(e)}
                  >
                    {/* {subSelected === '' && <option value="">All Sub Category</option>} */}
                    <option
                      defaultChecked={subSelected === "" ? true : false}
                      value=""
                    >
                      All Sub Category
                    </option>
                    {allSubCate.map((item: CategoryModel) => (
                      <option
                        key={"sub_post_" + item._id}
                        value={item._id}
                        defaultChecked={subSelected === item._id ? true : false}
                      >
                        {item.Name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter the title of the article"
                    onKeyDown={(e) => handleSearch(e)}
                  ></input>
                </div>
              </div>
            </div>

            <>
              {listAllPost.length >= 0 ? (
                <>
                  <table
                    id="post"
                    className="table table-striped table-bordered"
                    style={{ width: "100%", height: "90%" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }}>Image</th>
                        <th style={{ width: "10%" }}>Title</th>
                        <th>Description</th>
                        <th style={{ width: "10%" }}>URL</th>
                        <th style={{ width: "10%" }}>DateCreated</th>
                        <th style={{ width: "5%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listAllPost?.map((post: PostModel) => {
                        if (subSelected === "") {
                          return (
                            <tr key={"list-post_" + post._id}>
                              <td>
                                <img
                                  src={post["Image"]}
                                  style={{ maxWidth: "100px" }}
                                  alt="img"
                                  className="rounded-1"
                                  onError={(e) => handleErrorImg(e)}
                                />
                              </td>
                              <td>{post.Title}</td>
                              <td>{post.Description}</td>
                              <td>
                                <a
                                  href={"../" + post.PostUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Xem bài viết
                                </a>
                              </td>
                              <td>{post.DateCreated}</td>
                              <td className="text-center">
                                <NavLink
                                  to={"/admin/post/comment/" + post._id}
                                  state={{
                                    postId: post._id,
                                    postTitle: post.Title,
                                  }}
                                >
                                  <i className="icon-hover fa-solid fa-comment pr-2"></i>
                                </NavLink>
                                <NavLink
                                  to={"/admin/post/edit-post/" + post.PostUrl}
                                  onClick={() => handleEdit(post)}
                                >
                                  <i className="icon-hover fa-solid fa-pen-to-square pr-2"></i>
                                </NavLink>
                                <i
                                  className="icon-hover fa-solid fa-trash-can"
                                  onClick={() => handleRemove(post._id)}
                                ></i>
                              </td>
                            </tr>
                          );
                        } else {
                          if (post.PostCategoryId === subSelected) {
                            return (
                              <tr key={"list-post_" + post._id}>
                                <td>
                                  <img
                                    src={post["Image"]}
                                    style={{ maxWidth: "100px" }}
                                    alt="img"
                                    className="rounded-1"
                                    onError={(e) => handleErrorImg(e)}
                                  />
                                </td>
                                <td>{post.Title}</td>
                                <td>{post.Description}</td>
                                <td>
                                  <a
                                    href={"../" + post.PostUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Xem bài viết
                                  </a>
                                </td>
                                <td>{post.DateCreated}</td>
                                <td className="text-center">
                                  <NavLink
                                    to={"/admin/post/comment/" + post._id}
                                    state={{
                                      postId: post._id,
                                      postTitle: post.Title,
                                    }}
                                  >
                                    <i className="icon-hover fa-solid fa-comment pr-2"></i>
                                  </NavLink>
                                  <NavLink
                                    to={"/admin/post/edit-post/" + post._id}
                                    onClick={() => handleEdit(post)}
                                  >
                                    <i className="icon-hover fa-solid fa-pen-to-square pr-2"></i>
                                  </NavLink>
                                  <i
                                    className="icon-hover fa-solid fa-trash-can"
                                    onClick={() => handleRemove(post._id)}
                                  ></i>
                                </td>
                              </tr>
                            );
                          } else {
                            return (
                              <tr>
                                <td>Loading...</td>
                              </tr>
                            );
                          }
                        }
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Image</th>
                        <th style={{ width: "10%" }}>Title</th>
                        <th>Description</th>
                        <th style={{ width: "10%" }}>URL</th>
                        <th style={{ width: "10%" }}>DateCreated</th>
                        <th style={{ width: "5%" }}>Actions</th>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="pagination-post">
                    <span
                      onClick={() => movePage(MOVE.PREV)}
                      className={page === 1 ? "hiddenButton" : ""}
                    >
                      &laquo;
                    </span>
                    {[...Array(pagingTotal)].map(
                      (item, index) =>
                        index > 0 && (
                          <>
                            <span
                              key={index}
                              onClick={() => handleSetPage(index)}
                              className={
                                index === page ? "active-page-post" : ""
                              }
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
                </>
              ) : (
                <span>No Post</span>
              )}
            </>
          </>
        ) : (
          // <span>Hết</span>
          <>
            <span>Loading...</span>

            <table
              id="post"
              className="table table-striped table-bordered"
              style={{ width: "100%", height: "90%" }}
            >
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>Image</th>
                  <th style={{ width: "10%" }}>Title</th>
                  <th>Description</th>
                  <th style={{ width: "10%" }}>URL</th>
                  <th style={{ width: "10%" }}>DateCreated</th>
                  <th style={{ width: "5%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
              <tfoot>
                <tr>
                  <th>Image</th>
                  <th style={{ width: "10%" }}>Title</th>
                  <th>Description</th>
                  <th style={{ width: "10%" }}>URL</th>
                  <th style={{ width: "10%" }}>DateCreated</th>
                  <th style={{ width: "5%" }}>Actions</th>
                </tr>
              </tfoot>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Post;
