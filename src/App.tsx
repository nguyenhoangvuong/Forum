import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Admin from "./admin";
import "./App.css";
import { CategoryComponent } from "./components/export";
import { ResponseDataType } from "./models/export";
import { Explore, Login } from "./page/export";
import Loading from "./page/loading/loading";
import NotFound from "./page/notFound/notFound";
import Profile from "./page/profile/Profile";
import {
  CategoryServices,
  LocalStoreServices,
  UserServices
} from "./services/export";
import { userActions } from "./store/actions/export";
import { useAppDispatch, useAppSelector } from "./store/app/hooks";
import { categoryActions } from "./store/slice/category-slice";
import "./style/index.css";
import {
  DEFAULT_PARAM_ALL_CATEGORY
} from "./utils/constants";

function App() {
  const categoryState = useAppSelector((state) => state.category);
  const adminState = useAppSelector((state) => state.admin);
  const postState = useAppSelector((state) => state.post);
  const globalState = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.listCategory);
  let categoryID = categoryState.selected;

  let localtion = useLocation();
  let url = localtion.pathname;
  let param = url.split("/")[2];
  let user = LocalStoreServices.getCurrentUser();
  let roleID = globalState.user.currentUserRoleId;

  useEffect(() => {
    if (!param) {
      setfirst(false);
    } else {
      setfirst(true);
    }
  }, []);

  useEffect(() => {
    if (user.userId && roleID === '') {
      UserServices.getUserByID(String(user.userId)).then(async (res) => {
        let response = await res.data;
        dispatch(userActions.setCurrentUserRoleId(String(response.Data[0].RoleId)));
      });
    }
  }, [user.userId]);

  // fetch data
  useEffect(() => {
      CategoryServices.getCategory(DEFAULT_PARAM_ALL_CATEGORY)
        .then(async (res) => {
          let response: ResponseDataType = await res.data;
          dispatch(categoryActions.setListCategory(response.Data));
        })
        .catch((error) => {
          console.log(error);
        });
  }, [dispatch]);
  const [first, setfirst] = useState(false);

  if (
    (roleID === "2" ||
      roleID === "1") &&
    first
  ) {
    return (
      <>
        <Admin adminState={adminState} globalState={globalState} />
      </>
    );
  } else {
    return (
      <>
        {categories.length > 0 ? (
          <>
            <div className="body-decor"></div>
            <div className="main-layout--wrapper">
              <div className="main-layout">
                <CategoryComponent
                  categoryState={categoryState}
                  categories={categories}
                  setfirst={setfirst}
                  globalState={globalState}
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Explore
                        categoryState={categoryState}
                        postState={postState}
                        globalState={globalState}
                      />
                    }
                  />
                  <Route
                    path={"/:postName"}
                    element={
                      <Explore
                        categoryState={categoryState}
                        postState={postState}
                        globalState={globalState}
                      />
                    }
                  />
                  <Route path="/authen" element={<Login />} />
                  <Route path="/profile" element={<Profile globalState={globalState}/>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                {/* <Login /> */}
              </div>
            </div>
            <ToastContainer/>
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

export default React.memo(App);
