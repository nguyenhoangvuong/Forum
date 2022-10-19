import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Register from "../register/register";
import ForgotPassword from "../forgot-password/forgot-password";
import {
  LoginModel,
  LoginResponseModel,
  ResponseDataType,
  UserCreateModel,
} from "../../models/export";
import { AuthenServices, LocalStoreServices } from "../../services/export";
import { RESPONSE_SUCCESS } from "../../utils/constants";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";

type Props = {};

const Login: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  // 1: login
  // 2: register
  // 3: forgot password
  const [status, setStatus] = useState(1);
  const [loginForm, setLoginForm] = useState(new LoginModel());
  const [registerForm, setRegisterForm] = useState(new UserCreateModel());
  const [isEqualPass, setIsEqualPass] = useState(false);
  const [emailForgot, setEmailForgot] = useState("");
  const [validated, setValidated] = useState(false);

  let overlay = document.querySelector(".overlay");
  overlay?.classList.add("open");

  useEffect(() => {
    setValidated(false);
  }, [status]);

  function showTextStatus() {
    return status === 1
      ? "Sign in"
      : status === 2
      ? "Register"
      : "Forgot Password";
  }

  const handleSubmitForm = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
      setValidated(false);
    }
    setValidated(true);
  };

  function handleSubmit() {
    switch (status) {
      case 1:
        AuthenServices.Login(loginForm)
          .then(async (res) => {
            let response = await res.data;
            if (response.Code === RESPONSE_SUCCESS) {
              let loginResponse: LoginResponseModel = response.Data;
              LocalStoreServices.saveToken(loginResponse.Token);
              LocalStoreServices.saveUser(
                loginResponse.FullName,
                loginResponse.Image,
                loginResponse.UserId
              );
              toast.success(response.Message.Message);
              navigate("/");
            } else {
              toast.error(response.Message.Message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 2:
        if (isEqualPass === true) {
          AuthenServices.Register(registerForm)
            .then(async (res) => {
              let response: ResponseDataType = await res.data;
              if (response.Code === RESPONSE_SUCCESS) {
                toast.success(response.Message.Message);
                setStatus(1);
                setValidated(false);
              } else {
                toast.error(response.Message.Message);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setValidated(true);
          toast.error("Password second incorect");
        }
        break;
      case 3:
        AuthenServices.ForgotPassword(emailForgot)
          .then(async (res) => {
            let response: ResponseDataType = await res.data;
            if (response.Code === RESPONSE_SUCCESS) {
              toast.success(response.Message.Message);
              setValidated(false);
              setStatus(1);
            } else {
              toast.error(response.Message.Message + " or wrong email");
            }
          })
          .catch((error) => {
            console.log(error);
          });
        break;
    }
  }

  function formLogin() {
    return (
      <>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            md="12"
            className="mb-2"
            controlId="validationCustom02"
          >
            <Form.Control
              required
              type="text"
              placeholder="Enter Username *"
              value={loginForm.UserName}
              onChange={(e) =>
                setLoginForm({ ...loginForm, UserName: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Username is a required field
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="12"
            className="mb-2"
            controlId="validationCustom02"
          >
            <Form.Control
              required
              type="password"
              placeholder="Enter Password *"
              value={loginForm.Password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, Password: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Password is a required field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="row">
          <div className="col text-right">
            <span className="text-hover" onClick={() => setStatus(3)}>
              Forgot password?
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="login-container overlay">
      <div className="login-content">
        <div className="login-banner">
          <NavLink to="/" className="back-login">
            <i className="fas fa-angle-left"></i>
            Back
          </NavLink>
          <h2>{showTextStatus()}</h2>
          <span>
            Signing in to <strong>vote</strong> and <strong>discuss</strong>{" "}
            your interest topics
          </span>
        </div>
        <div className="login-option">
          <h2 className="w-100 text-center fw-bold text-primary">
            {showTextStatus()}
          </h2>
          <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
            {status === 1 ? (
              formLogin()
            ) : status === 2 ? (
              <Register
                registerForm={registerForm}
                setRegisterForm={setRegisterForm}
                isEqualPass={isEqualPass}
                setIsEqualPass={setIsEqualPass}
              />
            ) : (
              <ForgotPassword setEmailForgot={setEmailForgot} />
            )}

            <Button
              type="submit"
              className="btn btn-primary btn-block justify-content-center"
            >
              {status === 1 ? "Sign in" : "Submit"}
            </Button>
          </Form>
          <div className="text-center">
            {status === 1 ? (
              <p>
                Not a member ?{" "}
                <span className="text-hover" onClick={() => setStatus(2)}>
                  Register
                </span>
              </p>
            ) : (
              <p>
                Have account ?
                <span className="text-hover" onClick={() => setStatus(1)}>
                  {" "}
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
