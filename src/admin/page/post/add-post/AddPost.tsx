import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  CategoryModel,
  CreatePostModel,
  PostModel,
  ResponseDataType,
} from "../../../../models/export";
import {
  CategoryServices,
  LocalStoreServices,
  PostServices,
} from "../../../../services/export";
import { categoryActions } from "../../../../store/actions/export";
import { useAppDispatch } from "../../../../store/app/hooks";
import { CreateUpdatePostMapping } from "../../../../utils/mapping";
import "../../../static/css/custom.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function AddPost(props: any) {
  let { globalState } = props;
  let listCategory = globalState.category.listCategory;
  let listSubCategory = globalState.category.listSubCategory;
  let updatePost: PostModel = globalState.admin.updatePost;

  const dispatch = useAppDispatch();
  const editor = useRef(null);
  const navigate = useNavigate();
  let user = LocalStoreServices.getCurrentUser();
  const [validated, setValidated] = useState(false);
  let updating = CreateUpdatePostMapping(updatePost);

  let [createForm, setCreateForm] = useState(updating);
  let [subCate, setSubCate] = useState("");
  let [cate, setCate] = useState("");
  let [curSubCate, setCurSubCate] = useState(new CategoryModel());

  const [checkContent, setCheckContent] = useState(false);

  // set list subcate
  useEffect(() => {
    CategoryServices.getCategory(cate)
      .then(async (res) => {
        let response: any = await res.data;
        dispatch(categoryActions.setListSubCategory(response.Data));
        setSubCate(response?.Data[0]?._id);
      })
      .catch((error) => {});
  }, [cate, dispatch]);

  useEffect(() => {
    if (updating.PostId !== "") {
      // set up category and subcategory
      if (curSubCate._id === "") {
        CategoryServices.getCategoryByID(createForm.PostCategoryId)
          .then(async (res) => {
            let response = await res.data;
            setCurSubCate(response.Data);
          })
          .catch((error) => {});
      }

      if (curSubCate._id !== "") {
        CategoryServices.getCategory(curSubCate.CategoryParentId)
          .then(async (res) => {
            let response: any = await res.data;
            dispatch(categoryActions.setListSubCategory(response.Data));
            setSubCate(response.Data[0]._id);
          })
          .catch((error) => {});
      }
    }
  }, [curSubCate, createForm.PostCategoryId, updating.PostId, dispatch]);

  function handleSubmit() {
    if (fileDataURL) {
      createForm.Image = fileDataURL;
    } else {
      createForm.Image = "";
    }

    if (createForm.FinishTime === 0) {
      createForm.FinishTime = createForm.TakeTime;
    }

    let newPost = new CreatePostModel(
      createForm.PostId,
      createForm.Title,
      createForm.Descrption,
      createForm.Content,
      createForm.Image,
      createForm.MetaTitle,
      createForm.MetaKeywords,
      createForm.MetaDescription,
      subCate,
      createForm.TakeTime,
      createForm.KeyWords,
      createForm.LinkSource,
      (createForm.UserId = String(user.userId)),
      createForm.IsVerified,
      createForm.FinishTime
    );
    PostServices.createPost(newPost)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        if (response.Code === 200) {
          toast.success(response.Message.Message);
          navigate("/admin/post");
        } else {
          toast.error(response.Message.Message + " hoặc nội dung đang trống !");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmitForm = (event: any) => {
    const form = event.currentTarget;

    if (createForm.Content.length === 0) {
      setCheckContent(true);
    }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      !checkContent && handleSubmit();
      setValidated(false);
    }
    setValidated(true);
  };

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const changeHandler = (e: any) => {
    const file = e.target.files[0];
    if (!file?.type.match(imageMimeType)) {
      setFileDataURL(null);
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
          setCreateForm({ ...createForm, Image: String(result) });
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

  function handleSelectCate(e: any) {
    setCate(e.target.value);
  }

  let config = {
    zIndex: 1,
    readonly: false,
    activeButtonsInReadOnly: ["source", "fullsize", "print", "about"],
    toolbarButtonSize: "middle",
    theme: "default",
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    editorCssClass: false,
    height: 500,
    direction: "ltr",
    language: "vi",
    debugLanguage: false,
    i18n: "vi",
    tabIndex: -1,
    toolbar: true,
    enter: "P",
    useSplitMode: false,
    colorPickerDefaultTab: "background",
    removeButtons: [
      "source",
      "fullsize",
      "about",
      "outdent",
      "indent",
      "video",
      "print",
      "table",
      "fontsize",
      "superscript",
      "subscript",
      "file",
      "cut",
      "selectall",
    ],
    disablePlugins: ["paste", "stat"],
    events: {},
    textIcons: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    placeholder: "Try something",
    showXPathInStatusbar: false,
  };

  function onBlurContent(newContent: string) {
    if (newContent.length > 0) {
      setCheckContent(false);
    }
    setCreateForm({ ...createForm, Content: newContent });
  }

  return (
    <>
      {listSubCategory && listCategory && (
        <div className="d-flex flex-column p-2 pt-3 w-100">
          <h2 className="fw-bold">Add Post</h2>
          <hr />

          <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
            <Row>
              <div className="d-flex w-100 gap-5">
                <Form.Group
                  required
                  as={Col}
                  md="5"
                  className="mb-2 pl-0"
                  controlId="validationCustom00"
                >
                  <Form.Label>Category *</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    name="category"
                    onChange={(e) => handleSelectCate(e)}
                    value={cate}
                  >
                    {listCategory?.map(
                      (category: CategoryModel, index: number) => {
                        if (!cate && index === 0) {
                          setCate(category._id);
                        }

                        return (
                          <option
                            key={"option_" + category._id}
                            value={category._id}
                            selected={cate === category._id}
                          >
                            {category.Name}
                          </option>
                        );
                      }
                    )}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Category is a required field
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  required
                  as={Col}
                  md="5"
                  className="mb-2 pl-0"
                  controlId="validationCustom00"
                >
                  <Form.Label>SubCategory *</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    name="category"
                    onChange={(e) => {
                      setCreateForm({
                        ...createForm,
                        PostCategoryId: e.target.value,
                      });

                      setSubCate(e.target.value);
                    }}
                    onSelect={() => {}}
                    value={createForm.PostCategoryId || subCate}
                  >
                    {listSubCategory.map((subCategory: CategoryModel) => (
                      <option
                        key={"subCategory_" + subCategory._id}
                        value={subCategory._id}
                        selected={
                          subCategory._id ===
                          (subCate ||
                            createForm.PostCategoryId ||
                            listSubCategory[0]?._id)
                        }
                      >
                        {subCategory.Name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    SubCategory is a required field
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <Form.Group
                as={Col}
                md="12"
                className="mb-2"
                controlId="validationCustom01"
              >
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Title"
                  value={createForm.Title}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, Title: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Title is a required field
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                className="mb-2"
                controlId="validationCustom02"
              >
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Description"
                  value={createForm.Descrption}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, Descrption: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Description is a required field
                </Form.Control.Feedback>
              </Form.Group>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Content *</label>
                <div
                  style={{ width: "100%", minHeight: "500px" }}
                  className={checkContent ? "error-valid-jodit" : ""}
                >
                  <JoditEditor
                    ref={editor}
                    value={createForm.Content}
                    config={config}
                    onBlur={(newContent) => onBlurContent(newContent)}
                  />
                </div>
                {checkContent && (
                  <div className="error-valid">Content is a required field</div>
                )}
              </div>

              <Form.Group
                as={Col}
                md="6"
                className="mb-2"
                controlId="validationCustom04"
              >
                <Form.Label>Meta title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Meta title"
                  value={createForm.MetaTitle}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, MetaTitle: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                className="mb-2"
                controlId="validationCustom05"
              >
                <Form.Label>Meta keyword</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Meta keyword"
                  value={createForm.MetaKeywords}
                  onChange={(e) =>
                    setCreateForm({
                      ...createForm,
                      MetaKeywords: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                className="mb-2"
                controlId="validationCustom06"
              >
                <Form.Label>KeyWords</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter KeyWords"
                  value={createForm.KeyWords}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, KeyWords: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                className="mb-2"
                controlId="validationCustom07"
              >
                <Form.Label>Meta description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Meta description"
                  value={createForm.MetaDescription}
                  onChange={(e) =>
                    setCreateForm({
                      ...createForm,
                      MetaDescription: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                className="mb-2"
                controlId="validationCustom08"
              >
                <Form.Label>Take time (hours unit)</Form.Label>
                <Form.Control
                  required
                  type="number"
                  min={0}
                  placeholder="Enter Take time"
                  value={createForm.TakeTime}
                  onChange={(e) =>
                    setCreateForm({
                      ...createForm,
                      TakeTime: Number(e.target.value),
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Take time is a required field
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                className="mb-2"
                controlId="validationCustom08"
              >
                <Form.Label>Finish time (hours unit)</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  placeholder="Enter Take time"
                  value={createForm.FinishTime}
                  onChange={(e) =>
                    setCreateForm({
                      ...createForm,
                      FinishTime: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group
                as={Col}
                md="12"
                className="mb-2"
                controlId="validationCustom09"
              >
                <Form.Label>Link source</Form.Label>
                <Form.Control
                  type="text"
                  min={0}
                  placeholder="Enter Link source"
                  value={createForm.LinkSource}
                  onChange={(e) =>
                    setCreateForm({
                      ...createForm,
                      LinkSource: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                className="position-relative mb-3 mt-2"
              >
                <Form.Label>
                  Image {createForm.PostId?.length === 0 && "*"}
                </Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  className="file-upload"
                  onChange={(e) => changeHandler(e)}
                  accept=".png, .jpg, .jpeg"
                />
                {createForm.PostId?.length > 0 && (
                  <small style={{ color: "red" }}>
                    If no select file, default will file image before
                  </small>
                )}
              </Form.Group>
            </Row>
            {fileDataURL ? (
              <p className="img-preview-wrapper pt-2 w-25">
                {<img src={fileDataURL} alt="preview" />}
              </p>
            ) : (
              <p className="img-preview-wrapper pt-2 w-25">
                {<img src={createForm.Image} alt="No_image" />}
              </p>
            )}
            <div>
              <Button type="submit" className="btn btn-primary px-5 mr-3">
                Save
              </Button>
              <NavLink
                to={"../admin/post/"}
                type="submit"
                className="btn btn-info px-5"
              >
                Back
              </NavLink>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}

export default AddPost;
