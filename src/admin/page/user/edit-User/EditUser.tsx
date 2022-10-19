import React, { useState, useRef, useEffect } from "react";
import "../../../static/css/custom.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  ResponseDataType,
  UserModel,
  UserUpdateModel,
} from "../../../../models/export";
import { UserUpdateMapping } from "../../../../utils/mapping";
import { UserServices } from "../../../../services/export";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

type Props = {
  globalState: any;
  state:any
};

export const EditUser: React.FC<Props> = (props) => {
  let { globalState, state } = props;
  let selectedEditUser: UserModel = globalState.user.selectedEditUser;
  let editUser: UserUpdateModel = UserUpdateMapping(
    selectedEditUser._id.length > 0 ? selectedEditUser : state.user
  );
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [editForm, setEditForm] = useState({ ...editUser, Password: "" });
  const [passWord, setPassWord] = useState("");
  const [validated, setValidated] = useState(false);

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
    if (passWord.length > 0) {
      setEditForm({ ...editForm, Password: passWord });
    }
    
    if (fileDataURL) {
      editForm.Image = fileDataURL;
    } else {
      editForm.Image = "";
    }
      UserServices.updateUser(editForm)
        .then(async (res) => {
          let response: ResponseDataType = await res.data;
          if (response.Code === 200) {
            toast.success(response.Message.Message);
            navigate("/admin/user");
          } else {
            toast.error(response.Message.Message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
          setFileDataURL(result);
          setEditForm({ ...editUser, Image: String(result),Password: ""}); 
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
    <>
      <div className="d-flex flex-column p-2 pt-3 w-100">
        <h2 className="fw-bold">Edit user</h2>
        <hr />
        <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom01"
            >
              <Form.Label>Password New</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom02"
            >
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Full name"
                value={editForm.FullName}
                onChange={(e) =>
                  setEditForm({ ...editForm, FullName: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Fullname is a required field
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom02"
            >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone"
                pattern="[0-9]"
                value={editForm.Phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, Phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom02"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                required
                value={editForm.Email}
                onChange={(e) =>
                  setEditForm({ ...editForm, Email: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Email is a required field
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom02"
            >
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                type="select"
                placeholder="Role"
                className="custom-select custom-select-md w-100"
                value={editForm.RoleId}
                onChange={(e) =>
                  setEditForm({ ...editForm, RoleId: Number(e.target.value) })
                }
              >
                <option defaultChecked value="1">
                  Admin
                </option>
                <option value="2">Sub Admin</option>
                <option value="3">User</option>
              </Form.Control>
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom02"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                title="Address"
                value={editForm.Address}
                onChange={(e) =>
                  setEditForm({ ...editForm, Address: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="position-relative mb-3 mt-2">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                name="file"
                className="file-upload w-25"
                onChange={(e) => changeHandler(e)}
                accept=".png, .jpg, .jpeg"
              />
              <small style={{ color: "red" }}>
                If no select file, default will file image before
              </small>
            </Form.Group>
            {fileDataURL ? (
              <p className="img-preview-wrapper pt-2">
                {<img src={fileDataURL} alt="preview" />}
              </p>
            ) : (
              <p className="img-preview-wrapper pt-2">
                {<img src={editForm.Image} alt="No_image" />}
              </p>
            )}
          </Row>
          <div>
            <Button type="submit" className="btn btn-primary px-5 mr-3">
              Save
            </Button>
            <NavLink
              to={"../admin/user/"}
              type="submit"
              className="btn btn-info px-5"
            >
              Back
            </NavLink>
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditUser;
