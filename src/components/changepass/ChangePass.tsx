import React from "react";
import PropTypes from "prop-types";
import { LocalStoreServices } from "../../services/export";
var $ = require("jquery");

type Props = {};

const ChangePass: React.FC<Props> = (props) => {
  let user = LocalStoreServices.getCurrentUser();
  function handleSubmit(event: any) {
    var form = $("#formChangePassword");

    if (form[0].checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.addClass("was-validated");
    event.preventDefault();
  }
  return (
    <>
      <div className="col-md-6 offset-md-3 mt-5">
        <span className="anchor" id="formChangePassword"></span>
        <div className="card card-outline-secondary">
          <div className="card-header">
            <h3 className="mb-0">Change Password</h3>
          </div>
          <hr />
          <div className="card-body">
            <form className="form" role="form" autoComplete="on">
              <div className="form-group">
                <label htmlFor="inputPasswordOld">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPasswordOld"
                  required
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="inputPasswordNew">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPasswordNew"
                  required
                ></input>
                <span className="form-text small text-muted">
                  The password must be 8-20 characters, and must <em>not</em>{" "}
                  contain spaces.
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="inputPasswordNewVerify">Verify</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPasswordNewVerify"
                  required
                ></input>
                <span className="form-text small text-muted">
                  To confirm, type the new password again.
                </span>
              </div>
              <div className="form-group">
                <button
                  onClick={(event) => handleSubmit(event)}
                  className="btn btn-success btn-lg float-right"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePass;
