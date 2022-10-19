import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ResponseDataType,
  UserModel
} from "../../models/export";
import { UserServices } from "../../services/export";
import { RootState } from "../../store/app/store";
import { UserUpdateMapping } from "../../utils/mapping";

const imageMimeType = /image\/(png|jpg|jpeg)/i;


type Props = {
  globalState: RootState;
};

export const Profile: React.FC<Props> = (props) => {
  let { globalState } = props;
  let editUser: UserModel = globalState.user.selectedEditUser;
  let editing = UserUpdateMapping(editUser);
  let tokenUser = localStorage.getItem("token");
  //   let user = LocalStoreServices.getCurrentUser();
  let [editForm, setEditForm] = useState({ ...editing, Password: "" });

  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  let navigate = useNavigate();
  
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
          navigate("/");
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
          setEditForm({ ...editForm, Image: String(result), Password: "" });
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
  }, [file])

  return (
    <div className="w-100 bg-white p-3">
      <>
        {tokenUser !== null ? (
          <div className="d-flex flex-column p-2 pt-3 w-100">
            <h2 className="fw-bold">Edit Profile</h2>
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
                    value={editForm.Password}
                    onChange={(e) =>
                      setEditForm({ ...editForm, Password: e.target.value })
                    }
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
                    type="email"
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
                  md="12"
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
              </div>
            </Form>
          </div>
        ) : (
          <div className="h-100 d-flex align-items-center justify-content-center flex-column">
            <div className="fs-3 mb-3">Vui lòng đăng nhập</div>
            <div>
              <NavLink className="btn btn-login btn-primary" to="/authen">
                Đăng nhập
              </NavLink>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

// Profile.propTypes = {};

export default Profile;
