import React, { useEffect } from "react";
import { ResponseDataType } from "../../models/export";
import { CategoryServices } from "../../services/export";
import { categoryActions } from "../../store/actions/export";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { CategoryState } from "../../store/slice/export";

type Props = {
  categoryState: CategoryState;
};

const Entertainment: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const listSubCategory = useAppSelector(
    (state) => state.category.listSubCategory
  );

  let { categoryState } = props;
  let categoryID = categoryState.selected;

  useEffect(() => {
    CategoryServices.getCategory(categoryID)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        dispatch(categoryActions.setListSubCategory(response.Data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // active phổ biến hoặc mới nhất
  function handleActiveTab(evt: any, cityName: any) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      //   tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    // document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function handleSelectSubCategory(id: string) {
    dispatch(categoryActions.setSubSelected(id));
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
            <div className="cta-wrapper">
              <div className="btn-group btn-group-filter tab ">
                <span
                  className="btn btn-filter tablinks"
                  onClick={(e) => handleActiveTab(e, "Phobien")}
                >
                  <span className="btn--text">Phổ biến</span>
                </span>
                <span
                  className="btn btn-filter tablinks active"
                  onClick={(e) => handleActiveTab(e, "Moinhat")}
                >
                  <span className="btn--text">Mới nhất</span>
                </span>
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
          </div>
        </div>
        <div id="separator"></div>
      </div>
    </>
  );
};

export default Entertainment;
