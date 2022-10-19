import React, { useEffect, useState } from "react";
import { UserCreateModel } from "../../models/export";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
const imageMimeType = /image\/(png|jpg|jpeg)/i;


type Props = {
  registerForm: UserCreateModel,
  setRegisterForm: Function,
  isEqualPass: boolean,
  setIsEqualPass: Function
};

const Register: React.FC<Props> = (props) => {
  const [againPass, setAgainPass] = useState("");
  let { registerForm, setRegisterForm, isEqualPass, setIsEqualPass } = props;
  const [file, setFile] = useState(null);

  function handleInputAgainPass(e: any) {
    setAgainPass(e.target.value);
  }

  function handleInputAgainPassOnBlur() {
    if (againPass === registerForm.Password && againPass !== "") {
      setIsEqualPass(true);
    } else {
      setIsEqualPass(false);
    }
  }

  const changeHandler = (e: any) => {
    const file = e.target.files[0];
    if (!file?.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };
  useEffect(() => {
    let fileReader: any,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setRegisterForm({
            ...registerForm,
            Image: String(result)
          });
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);


  return (
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
          minLength={6}
          placeholder="Enter Username *"
          title="Username"
          value={registerForm.UserName}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, UserName: e.target.value })
          }
        />
        <Form.Control.Feedback type="invalid">
          Username is a required field and longer than 5 characters
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
          minLength={6}
          placeholder="Enter Password *"
          title="Password"
          value={registerForm.Password}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, Password: e.target.value })
          }
        />
        <Form.Control.Feedback type="invalid">
          Password is a required field and longer than 5 characters
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
          minLength={6}
          placeholder="Enter Again Password *"
          title="Again Password"
          value={againPass}
          onChange={(e) => handleInputAgainPass(e)}
          onBlur={() => handleInputAgainPassOnBlur()}
        />
        <Form.Control.Feedback type="invalid">
          Password is a required field, same with password and longer than 5
          characters
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
          type="text"
          placeholder="Full name *"
          title="Full name"
          value={registerForm.FullName}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, FullName: e.target.value })
          }
        />
        <Form.Control.Feedback type="invalid">
          Full name is a required field
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        as={Col}
        md="12"
        className="mb-2"
        controlId="validationCustom02"
      >
        <Form.Control
          type="number"
          placeholder="Enter Phone"
          pattern="[0-9]"
          maxLength={11}
          title="Phone"
          value={registerForm.Phone}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, Phone: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group
        as={Col}
        md="12"
        className="mb-2"
        controlId="validationCustom02"
      >
        <Form.Control
          required
          type="email"
          placeholder="Enter Email *"
          title="Email"
          value={registerForm.Email}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, Email: e.target.value })
          }
        />
        <Form.Control.Feedback type="invalid">
          {registerForm.Email.length === 0
            ? "Email is a required field"
            : "Email incorrect"}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="12" controlId="validationCustom02">
        <Form.Control
          type="text"
          placeholder="Enter Address"
          title="Address"
          value={registerForm.Address}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, Address: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="position-relative mb-3 mt-2">
        <Form.Control
          type="file"
          name="file"
          className="file-upload w-100"
          onChange={(e) => changeHandler(e)}
          accept=".png, .jpg, .jpeg"
        />
      </Form.Group>
    </Row>
  );
};

export default Register;
