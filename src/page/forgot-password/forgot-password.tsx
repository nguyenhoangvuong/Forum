import React, { useState } from "react";

type Props = {
  setEmailForgot:Function,
};
const ForgotPassword: React.FC<Props> = (props) => {
  let { setEmailForgot } = props;
  return (
    <form>
      <div className="form-outline">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Email *"
          onChange={(e) => setEmailForgot({Email: e.target.value})}
        ></input>
        <p className="text-sm text-center text-danger mt-1 mb-4">Please check your email to get the password!</p>
      </div>
    </form>
  );
};

export default ForgotPassword;
