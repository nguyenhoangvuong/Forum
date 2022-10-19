import React from "react";
import PropTypes from "prop-types";

type Props = {};

const SocialComponent: React.FC<Props> = (props) => {
  return (
    <>
      <div className="post-footer post-footer--rada">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <img
              className="mr-2"
              width="30"
              height="30"
              src="./assets/image/rada-animate.svg"
              alt="logo"
            ></img>
            <div className="d-flex flex-column mt-1 mb-3">
              <span className="logo--text">RADA</span>
              <span className="post-footer--quote">
                The DAO-based Angellist for Blockchain
              </span>
            </div>
          </div>
          <div className="post-footer--social">
            <a href="./" className="btn-social brand--telegram btn-default">
              <span>
                <i className="fa-brands fa-telegram"></i>
              </span>
              <span>Announcement</span>
            </a>
            <a href="./" className="btn-social brand--telegram btn-default">
              <span>
                <i className="fa-brands fa-telegram"></i>
              </span>
              <span>Global Community</span>
            </a>{" "}
            <a href="./" className="btn-social brand--twitter btn-default">
              <span>
                <i className="fa-brands fa-twitter"></i>
              </span>
              <span>Twitter</span>
            </a>{" "}
            <a href="./" className="btn-social brand--facebook btn-default">
              <span>
                <i className="fa-brands fa-facebook"></i>
              </span>
              <span>Fanpage</span>
            </a>{" "}
            <a href="./" className="btn-social brand--facebook btn-default">
              <span>
                <i className="fa-brands fa-facebook"></i>
              </span>
              <span>Vietnam Community</span>
            </a>{" "}
            <a href="./" className="btn-social brand--youtube btn-default">
              <span>
                <i className="fa-brands fa-youtube"></i>
              </span>
              <span>RADA TV</span>
            </a>
            <a href="./" className="btn-social brand--instagram btn-default">
              <span>
                <i className="fa-brands fa-instagram"></i>
              </span>
              <span>Instagram</span>
            </a>
            <a href="./" className="btn-social brand--tiktok btn-default">
              <span>
                <i className="fa-brands fa-tiktok"></i>
              </span>
              <span>tiktok</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialComponent;
