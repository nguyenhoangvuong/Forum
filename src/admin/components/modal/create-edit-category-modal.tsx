import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
var $ = require("jquery");
const imageMimeType = /image\/(png|jpg|jpeg)/i;

type Props = {
  nameType: string;
  newCate: any;
  setNewCate: any;
  handleSubmit: any;
  setStatusAction:any;
  statusAction: any;
};
export const CreateEditCategory: React.FC<Props> = (props) => {
  let {
    nameType,
    newCate,
    setNewCate,
    handleSubmit,
    setStatusAction,
    statusAction,
  } = props;

  const [file, setFile] = useState(null);
  const [validated, setValidated] = useState(false);
  let $1 = document.querySelector.bind(document);

      $(".file-upload").value = null;
  
  const handleSubmitForm = (event:any) =>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    let fileUpload: any = $1(".file-upload");

    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit(fileUpload, nameType);
      setStatusAction(true);
      setValidated(false);
    }
    setValidated(true);
  };

  const changeHandler = (e: any) => {
    const file = e.target.files[0];
    if (!file?.type.match(imageMimeType)) {
      setValidated(true);
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
          setNewCate({ ...newCate, Image: String(result) });
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

  function handleCloseModal() {
    setValidated(false);
  }
    return (
      <>
        <div
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {nameType}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleCloseModal()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmitForm}
                >
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>Category Name *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Category"
                        value={newCate.Name}
                        onChange={(e) => {
                          setNewCate({ ...newCate, Name: e.target.value });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Category name is a required field
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationCustom02"
                      className="mt-2"
                    >
                      <Form.Label>Order</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Order"
                        value={newCate.Order}
                        onChange={(e) => {
                          setNewCate({
                            ...newCate,
                            Order: Number(e.target.value),
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="position-relative mb-3 mt-2">
                      <Form.Label>Image *</Form.Label>
                      <div>
                        <label
                          className="mb-0 lable-select-image"
                          htmlFor="fusk"
                        >
                          Select Image: .png, jpg, jpeg.
                        </label>
                      </div>
                      <Form.Control
                        type="file"
                        required={
                          nameType.includes("Edit Category") ? false : true
                        }
                        id="fusk"
                        name="file"
                        className="file-upload"
                        onChange={(e) => changeHandler(e)}
                        accept=".png, .jpg, .jpeg"
                        style={{ display: "none" }}
                      />
                      {nameType.includes("Edit") && (
                        <small style={{ color: "red" }}>
                          If no select file, default will file image before
                        </small>
                      )}
                    </Form.Group>
                    {newCate.Image && (
                      <p className="img-preview-wrapper pt-2 w-25">
                        {<img src={newCate.Image} alt="No_image" />}
                      </p>
                    )}
                  </Row>
                  <div className="text-right">
                    <Button
                      type="button"
                      className="btn btn-secondary mr-2"
                      data-dismiss="modal"
                      onClick={() => handleCloseModal()}
                    >
                      Close
                    </Button>
                    <Button type="submit">Save changes</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};
