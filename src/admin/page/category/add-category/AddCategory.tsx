import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  CreateUpdateCategory,
  ResponseDataType
} from "../../../../models/export";
import { CategoryServices } from "../../../../services/export";
import { useAppDispatch } from "../../../../store/app/hooks";
import "../../../static/css/custom.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { Formik, Form as Forms, withFormik, FormikProps } from "formik";
import * as Yup from 'yup';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const imageMimeType = /image\/(png|jpg|jpeg)/i;

type Props = {
  globalState: any;
  state: any;
};

const AddCategory: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  let { globalState, state } = props;
  let editing = state;
  const [validated, setValidated] = useState(false);
  const [checkImage, setCheckImage] = useState(editing.Image);

  let [cateForm, setCateForm] = useState(editing._id === ""
    ? new CreateUpdateCategory() : (editing = {
          CategoryId: editing._id,
          Name: editing.Name,
          CatUrl: editing.CatUrl,
          Image: editing.Image,
          CategoryParentId: editing.CategoryParentId,
          Order: editing.Order,
          MetaTitle: editing.MetaTitle,
          MetaDescription: editing.MetaDescription,
          MetaKeyWords: editing.MetaKeyWords,
          KeyWords: editing.KeyWords,
          Status: editing.Status,
        }));
  
  let navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);

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
      cateForm.Image = fileDataURL;
    } else {
      cateForm.Image = "";
    }

    if (cateForm.CategoryId?.length === 0) {
      cateForm.Status = 1;
    }
      CategoryServices.createCategory(cateForm)
        .then(async (res) => {
          let response: ResponseDataType = await res.data;
          if (response.Code === 200) {
            toast.success(response.Message.Message);
            navigate("../admin/category/");
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
    if (!file.type.match(imageMimeType)) {
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
          setCateForm({ ...cateForm, Image: String(result) });
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

  // validation

  return (
    <>
      <div className="d-flex flex-column p-2 pt-3 w-100">
        {cateForm.CategoryId?.length > 0 ? (
          <h2 className="fw-bold">Edit Category</h2>
        ) : (
          <h2 className="fw-bold">Add Category</h2>
        )}

        <hr />
        <Formik
          initialValues={{
            firstName: "",
          }}
          onSubmit={() => {}}
        >
          <Form></Form>
        </Formik>

        <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom01"
            >
              <Form.Label>Category name *</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                placeholder="Enter Category"
                value={cateForm.Name}
                onChange={(e) =>
                  setCateForm({ ...cateForm, Name: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Category name is a required field
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom02"
            >
              <Form.Label>Category Order</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                placeholder="Enter Order"
                value={cateForm.Order ? cateForm.Order : 0}
                onChange={(e) => {
                  setCateForm({
                    ...cateForm,
                    Order: Number(e.target.value),
                  });
                }}
              />
              <Form.Control.Feedback type="invalid">
                SubCategory order is a required field
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="position-relative mb-3 mt-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="file"
                className="file-upload"
                onChange={(e) => changeHandler(e)}
                accept=".png, .jpg, .jpeg"
              />
              {cateForm.CategoryId?.length > 0 && (
                <small style={{ color: "red" }}>
                  If no select file, default will file image before
                </small>
              )}
            </Form.Group>
            {fileDataURL ? (
              <p className="img-preview-wrapper pt-2 w-25">
                {<img src={fileDataURL} alt="preview" />}
              </p>
            ) : (
              <p className="img-preview-wrapper pt-2 w-25">
                {<img src={cateForm.Image} alt="No_image" />}
              </p>
            )}
          </Row>
          <div>
            <Button type="submit" className="btn btn-primary px-5 mr-3">
              Save
            </Button>
            <NavLink
              to={"../admin/category/"}
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

export default AddCategory;
