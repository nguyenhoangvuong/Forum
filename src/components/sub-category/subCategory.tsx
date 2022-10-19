import React from "react";
import { CategoryModel } from "../../models/export";

type Props = {
  subCategory: CategoryModel;
  selectSubCategory: Function;
  selectKeyword: Function;
  isSelect: boolean;
};

const SubCategoryComponent: React.FC<Props> = (props) => {
  let { subCategory, selectSubCategory, selectKeyword, isSelect }: any = props;
  let backgroundColor = "white";

  if (isSelect === true) {
    backgroundColor = "whitesmoke";
  }

  function handleClicked(e: any, keyword?: string) {
    if (!e.target.className.includes("tag-keyword")) {
      selectSubCategory(subCategory._id);
    }
  }

  function handleClickedKeyword(e: any, keyword: string) {
    if (e.target.className.includes("tag-keyword")) {
      selectKeyword(keyword);
    }
  }

  function handleErrorImg(e: any) {
    e.target.src = "./assets/image/no-image.png";
  }

  return (
    <>
      <div
        key={subCategory._id}
        // to={subCategory?.CatUrl}
        onClick={(e) => handleClicked(e)}
        className="cards cards-post  hasComment hasVote"
        style={{ backgroundColor: backgroundColor }}
      >
        <div className="cards-media">
          <div className="cards-media-img">
            <span>
              <div
                style={{
                  display: "block",
                  overflow: "hidden",
                  position: "absolute",
                  inset: "0px",
                  boxSizing: "border-box",
                  margin: "0px",
                }}
              >
                <img
                  alt={subCategory?.MetaTitle}
                  sizes="100vw"
                  src={subCategory?.Image ? subCategory?.Image : ""}
                  onError={(e) => handleErrorImg(e)}
                  decoding="async"
                  data-nimg="fill"
                  className="cards-img"
                  style={{
                    position: "absolute",
                    inset: "0px",
                    boxSizing: "border-box",
                    padding: "0px",
                    border: "none",
                    margin: "auto",
                    display: "block",
                    width: "0px",
                    height: "0px",
                    minWidth: "100%",
                    maxWidth: "100%",
                    minHeight: "100%",
                    maxHeight: "100%",
                  }}
                ></img>
              </div>
            </span>
          </div>
        </div>
        <div className="cards-body">
          <div className="cards-body-header">
            <div className="cards-title">
              <span className="text-color-title">{subCategory?.Name}</span>
            </div>
          </div>
          <div className="metadata-wrapper justify-content-between">
            <div className="d-flex flex-shrink-0">
              <div className="metadata metadata-source d-flex align-items-center g-3">
                {subCategory?.KeyWords !== ""
                  ? subCategory.KeyWords?.split(",").map((item: string) => (
                      <span
                        key={"sub-cate-keywords-" + item}
                        className="metadata-value badge-tag tag-keyword"
                        onClick={(e) => handleClickedKeyword(e, item.trim())}
                      >
                        {item.trim()}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategoryComponent;
