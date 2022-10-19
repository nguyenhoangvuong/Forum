import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "jquery/dist/jquery.min.js";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ResponseDataType, UserModel, UserUpdateModel } from "../../../models/export";
import { UserServices } from "../../../services/export";
import { userActions } from "../../../store/actions/export";
import { useAppDispatch } from "../../../store/app/hooks";
import { DEFAULT_PARAM_ALL_USER } from "../../../utils/constants";
import { UserUpdateMapping } from "../../../utils/mapping";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var $ = require("jquery");

type Props = {
  globalState: any;
};

const User: React.FC<Props> = (props) => {
  let { globalState } = props;
  const dispatch = useAppDispatch();
  const userState = globalState.user;
  // const listUsers = useAppSelector((state) => state.user.listUsers);
  const listUsers = userState.listUsers;
  const [isCheck, setIsCheck] = useState(false);

  $(document).ready(function () {
    $("#user_list").DataTable();
  });

  useEffect(() => {
    UserServices.getUserByID(DEFAULT_PARAM_ALL_USER)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        dispatch(userActions.setListUser(response.Data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isCheck, dispatch]);

  useEffect(() => {
    $("#user_list").DataTable();
  }, [listUsers]);

  function handleEditUser(user: UserModel) {
    dispatch(userActions.setSelectedEditUser(user));
  }

  function handleRemoveUser(userID: string) {
    UserServices.deleteUser(userID).then(async (res) => {
      let response: ResponseDataType = await res.data;
      if (response.Code === 200) {
        toast.success(response.Message.Message);
      } else {
        toast.error(response.Message.Message);
      }
      setIsCheck(!isCheck);
    }).catch((error) => {
      console.log(error);
    });
  }

  function handleCheckBox(e: any, user: UserModel) {
    let editUser: UserUpdateModel = UserUpdateMapping(user);
    editUser.AccountStatus = e.target.checked ? 1 : 0;
    editUser.Image = "";
    editUser.Password = "";
    
    UserServices.updateUser(editUser)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        if (response.Code === 200) {
          toast.success(response.Message.Message);
          setIsCheck(!isCheck)
        } else {
          toast.error(response.Message.Message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleErrorImg(e: any) {
    e.target.src = "/assets/image/no-image.png";
  }

    return (
      <div className="d-flex flex-column w-100 position-relative">
        {listUsers?.length > 0 ? (
          <table
            id="user_list"
            className="table table-striped table-bordered"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Address</th>
                <th>Age</th>
                <th>Avatar</th>
                <th>Date Created</th>
                <th>Salary</th>
                <th className="text-center" style={{ width: "10%" }}>
                  Status
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listUsers?.map((user: UserModel) => (
                <tr key={"list-user_" + user._id}>
                  <td>{user.FullName}</td>
                  <td>{user.RoleId}</td>
                  <td>{user.Address}</td>
                  <td>61</td>
                  <td className="d-flex justify-content-center">
                    <img
                      src={user["Image"]}
                      style={{ maxWidth: "100px" }}
                      alt="img"
                      className="rounded-1"
                      onError={(e) => handleErrorImg(e)}
                    />
                  </td>
                  <td>{user.DateCreated}</td>
                  <td>$320,800</td>
                  <td className="text-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={user["Status"] === 1 ? "1" : "0"}
                        id="flexCheckChecked"
                        checked={user["Status"] === 1 ? true : false}
                        onChange={(e) => handleCheckBox(e, user)}
                      ></input>
                    </div>
                  </td>
                  <td className="text-center">
                    <NavLink
                      to={"/admin/user/" + user._id}
                      state={{
                        user: user,
                      }}
                    >
                      <i
                        className="icon-hover fa-solid fa-pen-to-square pr-2"
                        onClick={() => handleEditUser(user)}
                      ></i>
                    </NavLink>
                    <i
                      className="icon-hover fa-solid fa-trash-can pl-2"
                      onClick={() => handleRemoveUser(user._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Address</th>
                <th>Age</th>
                <th>Avatar</th>
                <th>Date Created</th>
                <th>Salary</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </tfoot>
          </table>
        ) : (
          <span className="text-center p-5">Loading...</span>
        )}
      </div>
    );
};

User.propTypes = {};

export default React.memo(User);
