import axiosClient from "./apiServices/axios";
import { LocalStoreServices } from "./localStoreServices/localStoreServices";
import * as CategoryServices from "./categoryServices/categoryServices";
import * as AuthenServices from "./authenServices/authenService";
import * as PostServices from "./postServices/postService";
import * as UserServices from "./userServices/userServices";
import * as CommentServices from "./commentServices/commentServices";

export { axiosClient, LocalStoreServices, CategoryServices, AuthenServices, PostServices, UserServices, CommentServices }

export default { axiosClient, LocalStoreServices, CategoryServices, AuthenServices, PostServices, UserServices, CommentServices }