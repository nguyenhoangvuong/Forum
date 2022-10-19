import { LoginModel, UserCreateModel } from "../../models/export";
import { axiosClient } from "../export";

export const Login = async (login: LoginModel): Promise<any> => {
  const url = `user/login`;
  return await axiosClient.post(url, login);
};

export const Register = async (userCreate: UserCreateModel): Promise<any> => {
  const url = `user/create`;
  return await axiosClient.post(url, userCreate);
};

export const getUser = async (id: string): Promise<any> => {
  const url = `user/get-userbyid`;
  return await axiosClient.post(url, id);
};

export const ForgotPassword = async (email: String): Promise<any> => {
  const url = `user/forgot`;
  return await axiosClient.post(url, email);
};
