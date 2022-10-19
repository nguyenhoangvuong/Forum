import React from "react";
type Props = {
  globalState: any;
};
const NavBar: React.FC<Props> = (props) => {
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg py-0">
      <span className="sidebar-toggle js-sidebar-toggle">
        <i className="hamburger align-self-center"></i>
      </span>
      <div
        className="navbar-collapse collapse dropcenter"
        style={{ zIndex: 9999 }}
      >
        <ul className="navbar-nav navbar-align">
          <li className="nav-item">
            <span
              className="nav-link d-none d-sm-inline-block"
              data-toggle="dropdown"
              aria-expanded="false"
            >
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const areEquals = (prev: Props, next: Props) => {
  return (
    prev.globalState.user.selectedEditUser.Image ===
    next.globalState.user.selectedEditUser.Image
  );
};

export default React.memo(NavBar, areEquals);
