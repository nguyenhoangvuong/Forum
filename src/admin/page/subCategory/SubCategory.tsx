import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "jquery/dist/jquery.min.js";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CategoryModel } from "../../../models/export";
import { ResponseDataType } from "../../../models/responseDataModels";
import { CategoryServices } from "../../../services/export";
import { adminActions } from "../../../store/actions/export";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { categoryActions } from "../../../store/slice/category-slice";
import { CreateUpdateCategoryMapping } from "../../../utils/mapping";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var $ = require("jquery");

type Props = {
  paramURL: string;
};

const SubCategory: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const listSubCategory = useAppSelector(
    (state) => state.category.listSubCategory
  );
  const [isCheck, setIsCheck] = useState(false);
  const [nameType, setNameType] = useState("Add SubCategory");

  let location = useLocation();
  let catURl1 = location.pathname;
  let paramURL = catURl1.split("/")[3];

  $(document).ready(function () {
    $("#sub-category").DataTable();
  });

  const [statusCallApi, setStatusCallApi] = useState(0);
  useEffect(() => {
    if (paramURL) {
      CategoryServices.getCategoryByCatURL(paramURL)
        .then(async (res) => {
          let response: ResponseDataType = await res.data;
          setStatusCallApi(response.Code);
          dispatch(categoryActions.setListSubCategory(response.Data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isCheck]);

  useEffect(() => {
    $("#sub-category").DataTable();
  }, [isCheck]);

  // error image
  function handleErrorImg(e: any) {
    e.target.src = "../../../assets/image/no-image.png";
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
      .catch((error) => {});
  }

  function handleCheckBox(e: any, category: CategoryModel) {
    let updated = CreateUpdateCategoryMapping(category);
    updated.Image = "";
    updated.Status = e.target.checked ? 1 : 0;
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

  function handleEdit(category: CategoryModel) {
    setNameType("Edit Subcategory");
    dispatch(adminActions.setUpdateCategory(category));
  }

  function handleAddNew() {
    dispatch(adminActions.setUpdateCategory(new CategoryModel()));
  }

  return (
    <div className="d-flex flex-column w-100 position-relative">
      {statusCallApi === 200 && listSubCategory?.length > 0 ? (
        <>
          <NavLink
            to={catURl1 + "/add-subcategory"}
            type="button"
            className="btn btn-primary w-auto btn-add"
            onClick={handleAddNew}
          >
            <i className="fa fa-plus pr-2"></i> Add New
          </NavLink>

          <table
            id="sub-category"
            className="table table-striped table-bordered"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>SubCate URL</th>
                <th>Image</th>
                <th>KeyWords</th>
                <th>MetaDescription</th>
                <th>MetaKeyWords</th>
                <th>MetaTitle</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listSubCategory?.map((item: CategoryModel) => (
                <tr key={"list-sub_" + item._id}>
                  <td>{item["Name"]}</td>
                  <td>{item["CatUrl"]}</td>
                  <td>
                    <img
                      src={item["Image"] ? item["Image"] : ""}
                      style={{ width: "100px", height: "50px" }}
                      alt="No_image"
                      onError={(e) => handleErrorImg(e)}
                    />
                  </td>
                  <td>{item["KeyWords"]}</td>
                  <td>{item["MetaDescription"]}</td>
                  <td>{item["MetaKeyWords"]}</td>
                  <td>{item["MetaTitle"]}</td>
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
                    <NavLink
                      to={catURl1 + "/edit-subcategory/" + item["CatUrl"]}
                      type="button"
                      state={item}
                      onClick={(e) => handleEdit(item)}
                    >
                      <i className="icon-hover fa-solid fa-pen-to-square pr-2"></i>
                    </NavLink>
                    {/* <i className="icon-hover fa-solid fa-pen-to-square pr-2"
                      onClick={() => handleEdit(item)}
                    ></i> */}
                    <i
                      className="icon-hover fa-solid fa-trash-can pl-2"
                      onClick={(e) =>
                        handleRemove(item["_id"] ? item["_id"] : "")
                      }
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>SubCate URL</th>
                <th>Image</th>
                <th>KeyWords</th>
                <th>MetaDescription</th>
                <th>MetaKeyWords</th>
                <th>MetaTitle</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </tfoot>
          </table>
        </>
      ) : statusCallApi === 200 && listSubCategory.length === 0 ? (
        <span className="p-5 text-center">No Subcategory</span>
      ) : (
        <span className="p-5 text-center">Loading...</span>
      )}

      <div className="w-100 d-flex justify-content-end pb-3">
        <NavLink
          to="/admin/category"
          className="btn btn-info mt-3 d-block"
          style={{ width: "200px" }}
        >
          Back
        </NavLink>
      </div>
    </div>
  );
};

const areEquals = (prev: Props, next: Props) => {
  return prev.paramURL === next.paramURL;
};

export default React.memo(SubCategory, areEquals);
