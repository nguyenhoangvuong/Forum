import { CreatePostModel } from "../../models/export";
import { axiosClient } from "../export";

export const getTimelineBySubCate = async (subCateID: string): Promise<any> => {
    const url = `post/get-timeline-by-subcategoryId`;
    return await axiosClient.post(url, subCateID);
}

export const getPostByID = async (postID: string, userID?: string): Promise<any> => {
    const url = `post/get-post-by-id`;
    let param = {PostId: postID, userID:userID}
    return await axiosClient.post(url, param);
}

export const getPostByKeyword = async (keyword: string): Promise<any> => {
    const url = `post/get-post-by-keyword`;
    let param = {keyword: keyword}
    return await axiosClient.post(url, param);
}

export const createPost = async (post: CreatePostModel): Promise<any> => {
    const url = `post/create-update-post`;
    return await axiosClient.post(url, post);
}

export const editPost = async (post: CreatePostModel): Promise<any> => {
    const url = `post/create-update-post`;
    return await axiosClient.post(url, post);
}

export const deletePost = async (postID: string): Promise<any> => {
    const url = `post/delete-post`;
    let param = {PostId: postID}
    return await axiosClient.post(url, param);
}

export const getAllPost = async (pageNumber: number = 0, pageSize: number = 0): Promise<any> => {
    const url = `post/get-list-post-by-subcategoryId`;
    let param = { SubCategoryId: "", PageNumber: pageNumber, PageSize: pageSize};
    return await axiosClient.post(url, param);
}

export const getAllPostBySubCateID = async (subCateID: string, pageNumber: number, pageSize: number = 10): Promise<any> => {
    const url = `post/get-list-post-by-subcategoryId`;
    let param = { SubCategoryId: subCateID, PageNumber: pageNumber, PageSize: pageSize};
    return await axiosClient.post(url, param);
}

export const getPostByURL = async (postURL: string, userID?: string): Promise<any> => {
    const url = `post/get-post-by-url`;
    let param = { UrlPost: postURL, userID:userID };
    return await axiosClient.post(url, param);
}

export const searchByTitle = async (title: string): Promise<any> => {
    const url = `post/search-post-by-title`;
    let param = { TitleValue: title };
    return await axiosClient.post(url, param);
}