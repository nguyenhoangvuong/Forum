import React, { useState } from "react";
import { useAppDispatch } from "../store/app/hooks";
import { AdminState } from "../store/slice/export";
import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";
import EditPost from "./page/post/add-post/EditPost";
import AddPost from "./page/post/add-post/AddPost";
import Post from "./page/post/Post";
import "./static/css/app.css";

import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ChangePass from "../components/changepass/ChangePass";
import { Login } from "../page/export";
import AddCategory from "./page/category/add-category/AddCategory";
import Category from "./page/category/Category";
import Comment from "./page/comment/Comment";
import AddSubCategory from "./page/subCategory/add-subcategory/AddSubCategory";
import SubCategory from "./page/subCategory/SubCategory";
import EditUser from "./page/user/edit-User/EditUser";
import User from "./page/user/User";

type Props = {
  adminState: AdminState;
  globalState: any
};

const Admin: React.FC<Props> = (props) => {
  let location = useLocation();
  const dispatch = useAppDispatch();
  const navigae = useNavigate()
  let { adminState, globalState } = props;

  let listNameCateUrl:any = [];

  let listNameCate = globalState.category.listCategory;
  listNameCate?.forEach((item:any) => {
    listNameCateUrl.push("/"+item.CatUrl);
  })

  let url = window.location.pathname;
  let checkURL = listNameCateUrl.find((item: any) => item === url)
  if (checkURL) {
    navigae("./admin/post");
  }
  let catURl1 = location.pathname;
  let paramURL = catURl1.split("/")[3];

  document
    .querySelector("link[rel~='icon']")
    ?.setAttribute("href", "./assets/image/rada-animate.svg1");

  const [hidden, setHidden] = useState(false);
  let $ = document.querySelector.bind(document);
  let hamburger = $(".sidebar-toggle");

  hamburger?.addEventListener("click", () => {
    setHidden(!hidden);
  });


  return (
    <div className="wrapper">
      <SideBar hidden={hidden} />
      <div className="main overflow-hidden" style={{ height: "100vh" }}>
        <NavBar globalState={globalState} />
        <main className="content p-3 overflow-scroll content-admin-scroll">
          <div className="container-fluid bg-white rounded">
            <div className="row">
              <div className="col-12 col-lg-12 d-flex">
                <Routes>
                  <Route
                    path="/admin"
                    element={<Navigate replace to="/admin/post" />}
                  />
                  <Route
                    path="/admin/post"
                    element={<Post globalState={globalState} />}
                  />
                  <Route path="/admin/category" element={<Category />} />
                  <Route
                    path="/admin/category/:catURL"
                    element={<SubCategory paramURL={paramURL} />}
                  />
                  <Route
                    path="/admin/post/add-post/"
                    element={<AddPost globalState={globalState} />}
                  />
                  <Route
                    path="/admin/post/edit-post/:postURL"
                    element={<EditPost globalState={globalState} />}
                  />
                  <Route
                    path="/admin/user"
                    element={<User globalState={globalState} />}
                  />
                  <Route
                    path="/admin/user/:userID"
                    element={
                      <EditUser
                        globalState={globalState}
                        state={location["state"]}
                      />
                    }
                  />
                  <Route
                    path="/admin/category/:catURL/add-subcategory"
                    element={
                      <AddSubCategory
                        globalState={globalState}
                        state={location["state"]}
                      />
                    }
                  />
                  <Route
                    path="/admin/category/:catURL/edit-subcategory/:subCat"
                    element={
                      <AddSubCategory
                        globalState={globalState}
                        state={location["state"]}
                      />
                    }
                  />
                  <Route path="/authen" element={<Login />} />
                  <Route
                    path="/admin/change-password"
                    element={<ChangePass />}
                  />
                  <Route
                    path="/admin/post/comment/:postID"
                    element={<Comment state={location["state"]} />}
                  />
                  <Route
                    path="/admin/category/add-category"
                    element={
                      <AddCategory
                        globalState={globalState}
                        state={location["state"]}
                      />
                    }
                  />
                  <Route
                    path="/admin/category/edit-category/:cate"
                    element={
                      <AddCategory
                        globalState={globalState}
                        state={location["state"]}
                      />
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Admin;
