import React from "react";
import { NavLink, useNavigate,Link } from "react-router-dom";
import { CategoryModel } from "../../models/export";
import { LocalStoreServices, UserServices } from "../../services/export";
import { categoryActions, userActions } from "../../store/actions/export";
import { useAppDispatch } from "../../store/app/hooks";
import { RootState } from "../../store/app/store";
import { CategoryState } from "../../store/slice/export";

type Props = {
  categoryState: CategoryState;
  categories: any;
  setfirst: any;
  globalState: RootState;
};

const CategoryComponent: React.FC<Props> = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { categoryState, categories, setfirst, globalState } = props;

  let subSelect = categoryState.listSubCategory.find((sub: CategoryModel) => sub._id === categoryState.subSelected);
  let user = LocalStoreServices.getCurrentUser();
  let roleID = globalState.user.currentUserRoleId;

  function handleClicked(id: string, catUrl: string, name: string) {
    dispatch(categoryActions.setSelected(id));
    // dispatch(categoryActions.setSubSelected(NONE));
    navigate(`/`);
  }

  let btnLogin = document.querySelector('.btn-login');
  let overlay = document.querySelector('.overlay');
  // click button login then open modal option login
  btnLogin?.addEventListener('click', () => {
      overlay?.classList.add('open');
  });

  function handleLogin() {
    navigate('/authen');
  }

  function handleLogout() {
    // localStorage.removeItem("USER_ID");
    // localStorage.removeItem("FULL_NAME");
    // localStorage.removeItem("USER_IMAGE");
    // localStorage.removeItem("ROLE_ID");
    // localStorage.removeItem("token");
    LocalStoreServices.removeToken();
    LocalStoreServices.removeUser();
    navigate('/authen');
  }

  let tokenUser = localStorage.getItem("token");

  function handleErrorImg(e:any) {
    e.target.src = "./assets/image/no-image.png"
  }

  let $$ = document.querySelectorAll.bind(document)
  let $ = document.querySelector.bind(document)
  let navItem = $$(".nav-item");
  let navItemActive = $(".nav-item.active");
  navItem.forEach(item => {
    item.addEventListener("click", () => {
      navItemActive?.classList.remove("active");
      item.classList.add("active");
    })
  });

  function handleEditProfile() {
    UserServices.getUserByID(String(user.userId)).then(async (res) => {
      let response = await res.data;
      dispatch(userActions.setSelectedEditUser(response.Data[0]));
      navigate("/profile");
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="pane-left">
      <div className="nav-bar">
        <div className="logo">
          <NavLink
            to=""
            className="d-flex flex-column w-100 justify-content-center align-items-center"
          >
            <div className="logo-wrapper">
              <img src="./assets/image/rada-animate.svg" alt=""></img>
            </div>
            <strong className="logo--text mt-1">
              <span>RADA</span>
            </strong>
            <div className="logo--badge">βETA</div>
          </NavLink>
        </div>
        <div className="nav-main scroll-bar">
          {categories.map((item: CategoryModel, index: number) => (
            item.Status === 1 &&
            <span
              key={"categories_" + item._id}
              className={
                item._id === subSelect?.CategoryParentId
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => handleClicked(item._id, item.CatUrl, item.Name)}
            >
              <span className="icon">
                <img
                  src={item.Image ? item.Image : ""}
                  alt=""
                  onError={(e) => handleErrorImg(e)}
                />
              </span>
              <span className="nav-item--text">{item.Name}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="pane-left--bottom">
        {tokenUser !== null && (
          <div className="btn-default btn-login text-center flex-column d-flex">
            <div style={{ borderTop: "1px solid #999", paddingTop: "3px",cursor:"pointer"}} onClick={handleEditProfile}>Edit Profile</div>
            {roleID === "1" && (
              <Link to="/admin/post" onClick={() => setfirst(true)}>
                Page admin
              </Link>
            )}
          </div>
        )}

        <div className="btn-default btn-login">
          <span className="icon">
            <i className="fa-solid fa-user-circle"></i>
          </span>
          {tokenUser === null ? (
            <span className="btn--text btn-login--text" onClick={handleLogin}>
              Đăng nhập
            </span>
          ) : (
            <span className="btn--text btn-login--text" onClick={handleLogout}>
              Đăng Xuất
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;
