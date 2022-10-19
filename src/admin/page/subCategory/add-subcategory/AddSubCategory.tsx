import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  CategoryModel,
  CreateUpdateCategory,
  ResponseDataType
} from "../../../../models/export";
import { CategoryServices } from "../../../../services/export";
import "../../../static/css/custom.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const imageMimeType = /image\/(png|jpg|jpeg)/i;

function AddSubCategory(props: any) {
  let { globalState, state } = props;
  let catURL = useParams();

  const [validated, setValidated] = useState(false);

  let listCategory = globalState.category.listCategory;
  
  let editing = globalState.admin.updateCategory ? globalState.admin.updateCategory : state;
  let parent: CategoryModel = listCategory.find(
    (category: CategoryModel) => category.CatUrl === catURL.catURL
  );

  const [checkImage, setCheckImage] = useState(editing.Image);

  let [subCateForm, setSubCateForm] = useState(
    editing._id === ""
      ? new CreateUpdateCategory("", "", "", parent._id)
      : (editing = {
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
        })
  );
  let navigate = useNavigate();

  let subCat = catURL.subCat;

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
    if (subCateForm.CategoryId && checkImage === subCateForm.Image) {
      subCateForm.Image = "";
    }
    CategoryServices.createCategory(subCateForm)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        if (response.Code === 200) {
          toast.success(response.Message.Message);
          navigate("../admin/category/" + catURL.catURL);
        } else {
          toast.error(response.Message.Message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

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
          setSubCateForm({ ...subCateForm, Image: String(result) });
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

  // useEffect(() => {
  //   setSubCateForm(editing);
  // }, [editing]);

  function handleKeywords(keyword: string) {
    setSubCateForm({ ...subCateForm, KeyWords: keyword });
  }

  return (
    <>
      <div className="d-flex flex-column p-2 pt-3 w-100">
        {subCat ? (
          <h2 className="fw-bold">Edit Sub Category</h2>
        ) : (
          <h2 className="fw-bold">Add Sub Category</h2>
        )}

        <hr />

        <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom01"
            >
              <Form.Label>SubCategory name *</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter SubCategory"
                value={subCateForm.Name}
                onChange={(e) =>
                  setSubCateForm({ ...subCateForm, Name: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                SubCategory name is a required field
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
                value={subCateForm.Order}
                onChange={(e) => {
                  setSubCateForm({
                    ...subCateForm,
                    Order: Number(e.target.value),
                  });
                }}
              />
              <Form.Control.Feedback type="invalid">
                SubCategory order is a required field
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom04"
            >
              <Form.Label>MetaDescription *</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter MetaDescription"
                value={subCateForm.MetaDescription}
                onChange={(e) =>
                  setSubCateForm({
                    ...subCateForm,
                    MetaDescription: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                MetaDescription is a required field
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom05"
            >
              <Form.Label>KeyWords *</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter KeyWords"
                value={subCateForm.KeyWords}
                onChange={(e) => handleKeywords(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                KeyWords name is a required field
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom06"
            >
              <Form.Label>MetaKeyWords</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter MetaKeyWords"
                value={subCateForm.MetaKeyWords}
                onChange={(e) =>
                  setSubCateForm({
                    ...subCateForm,
                    MetaKeyWords: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              className="mb-2"
              controlId="validationCustom07"
            >
              <Form.Label>MetaTitle *</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter MetaTitle"
                value={subCateForm.MetaTitle}
                onChange={(e) =>
                  setSubCateForm({ ...subCateForm, MetaTitle: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                MetaTitle is a required field
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="position-relative mb-3 mt-2">
              <Form.Label>Image {!subCat && "*"}</Form.Label>
              <Form.Control
                type="file"
                name="file"
                className="file-upload"
                onChange={(e) => changeHandler(e)}
                accept=".png, .jpg, .jpeg"
              />
              {subCat && (
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
                {<img src={subCateForm.Image} alt="No_image" />}
              </p>
            )}
          </Row>
          <div>
            <Button type="submit" className="btn btn-primary px-5 mr-3">
              Save
            </Button>
            <NavLink
              to={"../admin/category/" + catURL.catURL}
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
}

export default AddSubCategory;
