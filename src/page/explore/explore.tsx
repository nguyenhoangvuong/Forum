import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ContentDetailComponent,
  PostDetailComponent,
  SubCategoryComponent,
} from "../../components/export";
import { CategoryModel, ResponseDataType } from "../../models/export";
import { CategoryServices, PostServices } from "../../services/export";
import { categoryActions, postActions } from "../../store/actions/export";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { RootState } from "../../store/app/store";
import { CategoryState, PostState } from "../../store/slice/export";
import "../../style/explore.css";
import { NONE } from "../../utils/constants";

type Props = {
  categoryState: CategoryState;
  postState: PostState;
  globalState: RootState;
};

const Explore: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  let listSubCategory = useAppSelector(
    (state) => state.category.listSubCategory
  );

  let { categoryState, postState, globalState } = props;
  let categoryID = categoryState.selected;
  let location = useLocation();

  let catURl = location.pathname;
  let paramURL = catURl.split("/")[1];

  const [isCheck, setIsCheck] = useState(false);
  const [change, setChange] = useState(false);

  // set meta
  function setMeta(post: any) {
    document
      .querySelector("meta[property~='og:url']")
      ?.setAttribute(
        "content",
        window.location.protocol +
          "/" +
          window.location.host
      );
    document
      .querySelector("meta[property~='og:image']")
      ?.setAttribute(
        "content",
        post.Image ? post.Image : "./assets/image/rada-animate.svg"
    );
  }

  const [subIDSelect, setSubIDSelect] = useState("");
  useEffect(() => {
    if (categoryID !== NONE) {
      CategoryServices.getCategory(categoryID)
        .then(async (res) => {
          let response: ResponseDataType = await res.data;
          dispatch(categoryActions.setListSubCategory(response.Data));
          let responseActive = response.Data.filter(
            (item: any) => item.Status === 1
          );
          dispatch(categoryActions.setSubSelected(responseActive[0]["_id"]));
          setAllPost(responseActive[0]["_id"]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (paramURL) {
      // PostServices.getPostByURL(paramURL)
      //   .then(async (res) => {
      //     let response = await res.data;
      //     let listSubCate = response.Data["lSubCategory"];
      //     let selectSub = "";
      //     dispatch(categoryActions.setListSubCategory(listSubCate));
      //     listSubCate.forEach((cate: any) => {
      //       if (cate.IsDefault === true) {
      //         dispatch(categoryActions.setSubSelected(cate._id));
      //         selectSub = cate._id;
      //       }
      //     });
      //     setAllPost(selectSub);
      //     dispatch(postActions.setPostSelected(response.Data["Post"]));
      //   })
      //   .catch((error) => console.log(error));
      getPostByURLAction();
    } else if (categoryState.subSelected === "NONE" && !paramURL) {
      let cateFirst = categoryState.listCategory[0];
      CategoryServices.getCategoryByCatURL(cateFirst.CatUrl)
        .then(async (res) => {
          let response: ResponseDataType = await res.data;
          dispatch(categoryActions.setListSubCategory(response.Data));
          let subActive = response.Data.filter(
            (item: any) => item.Status === 1
          );
          dispatch(categoryActions.setSubSelected(subActive[0]["_id"]));
          setSubIDSelect(subActive[0]["_id"]);
          setIsCheck(!isCheck);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isCheck, categoryID]);
  // get post default init
  useEffect(() => {
    if (!paramURL && categoryID) {
      PostServices.getAllPostBySubCateID(subIDSelect, 0)
        .then(async (res) => {
          dispatch(postActions.setListAllPost([]));
          let response = await res.data;
          dispatch(postActions.setListAllPost(response.Data.ListPost));
          if (response.Data.length > 0) {
            dispatch(postActions.setContent(response.Data[0]["Content"]));
            setMeta(response.Data[0]);
          } else {
            dispatch(postActions.setContent(NONE));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [subIDSelect]);

  let userId = localStorage.getItem("USER_ID");
  function getPostByURLAction() {
    PostServices.getPostByURL(paramURL, String(userId))
      .then(async (res) => {
        let response = await res.data;
        let listSubCate = response.Data["lSubCategory"];
        let selectSub = "";
        dispatch(categoryActions.setListSubCategory(listSubCate));
        listSubCate.forEach((cate: any) => {
          if (cate.IsDefault === true) {
            dispatch(categoryActions.setSubSelected(cate._id));
            selectSub = cate._id;
          }
        });
        setAllPost(selectSub);
        dispatch(postActions.setPostSelected(response.Data["Post"]));
      })
      .catch((error) => console.log(error));
  }

  function handleSelectSubCategory(id: string) {
    dispatch(categoryActions.setSubSelected(id));
    setAllPost(id, "subCate");
  }

  function handleSelectKeyword(keyword: string) {
    setAllPost(keyword, "keyword");
  }

  function setAllPost(data: string, type?: string) {
    if (type === "keyword") {
      PostServices.getPostByKeyword(data)
        .then(async (res) => {
          // set to clear data (refresh timeline :))
          dispatch(postActions.setListAllPost([]));
          let response: ResponseDataType = await res.data;
          dispatch(postActions.setListAllPost(response.Data));
          if (response.Data.length > 0) {
            dispatch(postActions.setContent(response.Data[0]["Content"]));
          } else {
            dispatch(postActions.setContent(NONE));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      PostServices.getAllPostBySubCateID(data, 0)
        .then(async (res) => {
          // set to clear data (refresh timeline :))
          dispatch(postActions.setListAllPost([]));
          let response = await res.data;
          dispatch(postActions.setListAllPost(response.Data.ListPost));
          if (response.Data.length > 0) {
            dispatch(postActions.setContent(response.Data[0]["Content"]));
            setMeta(response.Data[0]);
          } else {
            dispatch(postActions.setContent(NONE));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <div className="pane-center splitter d-flex">
        <div className="pane-content--main" id="first">
          <div className="pane-content--main--top">
            <div className="search-wrapper">
              <div className="navbar-search">
                <span className="icon navbar-search--icon">
                  <i className="fa fa-search"></i>
                </span>
                <input
                  type="text"
                  className="navbar-search--input"
                  placeholder="Bạn đang tìm gì ?"
                ></input>
              </div>
            </div>
          </div>

          <div
            className="pane-content--main--main scrollbar tabcontent style-2"
            style={{ display: "none" }}
            id="Phobien"
          >
            <div className="cards-list">{/* <SubCategoryComponent /> */}</div>
          </div>
          <div
            className="pane-content--main--main scrollbar tabcontent style-2"
            id="Moinhat"
          >
            <div className="cards-list">
              {listSubCategory.map(
                (item: CategoryModel) =>
                  item.Status === 1 && (
                    <SubCategoryComponent
                      subCategory={item}
                      selectSubCategory={handleSelectSubCategory}
                      selectKeyword={handleSelectKeyword}
                      isSelect={
                        item._id === categoryState.subSelected ? true : false
                      }
                      key={item._id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
        <div id="separator"></div>
        {/* <IntroduceComponent /> */}
        <div className="post-area scroll-bar">
          {categoryState.subSelected !== NONE ? (
            <>
              <PostDetailComponent
                categoryState={categoryState}
                postState={postState}
              />
          
              <ContentDetailComponent
                postState={postState}
                globalState={globalState}
                setChange={getPostByURLAction}
                setIsCheck={setIsCheck}
              />
            </>
          ) : (
            <div className="w-100 d-flex align-items-center justify-content-center p-5">
              Loading...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Explore;
