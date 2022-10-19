import React from "react";
import PropTypes from "prop-types";
import "./loading.css";

function Loading() {
  return (
    <>
      <div className="background-loading">
            <div className="spinner-4"></div>
      </div>
    </>
  );
}

Loading.propTypes = {};

export default Loading;
