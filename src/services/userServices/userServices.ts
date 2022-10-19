import { UserUpdateModel } from "../../models/export";
import { axiosClient } from "../export";

export const getUserByID = async (userID: string) => {
  const url = `user/get-userbyid`;
  let param = { Id: userID };
  return await axiosClient.post(url, param);
};

export const updateUser = async (userUpdate: UserUpdateModel) => {
   const url = `user/update`;
   return await axiosClient.post(url, userUpdate);
}

export const deleteUser = async (userID: string) => {
   const url = `user/delete`;
   let param = { UserId: userID };
   return await axiosClient.post(url, param);
}