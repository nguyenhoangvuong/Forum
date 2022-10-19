import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { DEFAULT_PARAM_ALL_CATEGORY } from "../../../utils/constants";
import { CategoryServices } from "../../../services/export";
import {
  CategoryModel,
  CreateUpdateCategory,
  ResponseDataType,
} from "../../../models/export";
import { adminActions, categoryActions } from "../../../store/actions/export";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { CreateEditCategory } from "../../components/modal/create-edit-category-modal";
import { NavLink } from "react-router-dom";
import { CreateUpdateCategoryMapping } from "../../../utils/mapping";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var $ = require("jquery");

type Props = {};

const Category: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.listCategory);
  const [isCheck, setIsCheck] = useState(false);

  const [newCate, setNewCate] = useState(new CategoryModel());
  const [nameType, setNameType] = useState("Add Category");
  const [statusAction, setStatusAction] = useState(false);

  // const [categories, setCategories] = useState([]);
  

  $(document).ready(function () {
    $("#category").DataTable();
  });

  useEffect(() => {
    CategoryServices.getCategory(DEFAULT_PARAM_ALL_CATEGORY)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        dispatch(categoryActions.setListCategory(response.Data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, isCheck]);

  useEffect(() => {
    $("#category").DataTable();
  }, [isCheck]);

  function handleErrorImg(e: any) {
    e.target.src = "../../assets/image/no-image.png";
  }

  function handleRemove(id: string) {
    CategoryServices.deleteCategory(id)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        if (response.Code === 200) {
          toast.success(response.Message.Message);
        } else {
          toast.error(response.Message.Message);
        }
        setIsCheck(!isCheck);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEdit(item: CategoryModel) {
    setNameType("Edit Category");
    dispatch(adminActions.setUpdateCategory(item));
  }

  function handleAddNew() {
    setNewCate(new CategoryModel());
    setNameType("Add Category");
    dispatch(adminActions.setUpdateCategory(new CategoryModel()));
  }

  function handleCheckBox(e: any, category: CategoryModel) {
    let updated = CreateUpdateCategoryMapping(category);
    updated.Status = e.target.checked ? 1 : 0;
    updated.Image = "";
    CategoryServices.createCategory(updated)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        if (response.Code === 200) {
          toast.success(response.Message.Message);
        } else {
          toast.error(response.Message.Message);
        }
        setIsCheck(!isCheck);
      })
      .catch((error) => {});
  }

  return (
    <div className="d-flex flex-column w-100 position-relative">
      {categories.length > 0 ? (
        <>
          <NavLink
            to="/admin/category/add-category"
            type="button"
            state={{ nameType: "Add" }}
            className="btn btn-primary w-auto btn-add"
            onClick={handleAddNew}
          >
            <i className="fa fa-plus pr-2"></i> Add New
          </NavLink>

          {/* table data */}
          <table
            id="category"
            className="table table-striped table-bordered"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>CatURL</th>
                <th className="text-center">Image</th>
                <th className="text-center" style={{ width: "10%" }}>
                  SubCate
                </th>
                <th className="text-center" style={{ width: "10%" }}>
                  Status
                </th>
                <th className="text-center" style={{ width: "10%" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((item: CategoryModel) => (
                <tr key={item["_id"]} className="min-height-25">
                  <td>{item["Name"]}</td>
                  <td>{item["CatUrl"]}</td>
                  <td className="d-flex justify-content-center">
                    <img
                      src={item["Image"]}
                      style={{ maxWidth: "100px" }}
                      alt="img"
                      className="rounded-1"
                      onError={(e) => handleErrorImg(e)}
                    />
                  </td>
                  <td className="text-center">
                    <NavLink
                      to={"/admin/category/" + item["CatUrl"]}
                      state={item["_id"]}
                    >
                      <i className="fa-solid fa-eye icon-hover"></i>
                    </NavLink>
                  </td>
                  <td className="text-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={item["Status"] === 1 ? "1" : "0"}
                        id="flexCheckChecked"
                        checked={item["Status"] === 1 ? true : false}
                        onChange={(e) => handleCheckBox(e, item)}
                      ></input>
                    </div>
                  </td>
                  <td className="text-center">
                    {/* <i className="icon-hover fa-solid fa-pen-to-square pr-2" onClick={() => handleEdit(item._id)}></i> */}
                    <NavLink
                      to={"/admin/category/edit-category/" + item["CatUrl"]}
                      type="button"
                      state={item}
                      onClick={(e) => handleEdit(item)}
                    >
                      <i className="icon-hover fa-solid fa-pen-to-square pr-2"></i>
                    </NavLink>
                    <i
                      className="icon-hover fa-solid fa-trash-can pl-2"
                      onClick={() => handleRemove(item._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>CatURL</th>
                <th>Image</th>
                <th className="text-center">Subcate</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </tfoot>
          </table>
        </>
      ) : (
        <span className="p-5 w-100 text-center">Loading...</span>
      )}
    </div>
  );
};

Category.propTypes = {};

export default React.memo(Category);
