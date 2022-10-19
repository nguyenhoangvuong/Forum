import { AxiosResponse } from "axios";
import { CategoryFetchModel, CreateUpdateCategory } from "../../models/export";
import { axiosClient } from "../export";

export const getCategory = async (cateID: string): Promise<any> => {
    const url = `category/get-category`;
    let param: CategoryFetchModel = new CategoryFetchModel(cateID);
    return await axiosClient.post(url, param);
}

export const getCategoryByCatURL = async (catURL: string): Promise<any> => {
    const url = `category/get-subcategory-by-urlcat`;
    let param = {UrlCat: catURL};
    return await axiosClient.post(url, param);
}

export const createCategory = async (newCategory: CreateUpdateCategory) => {
    const url = `category/create-update-category`;
    return await axiosClient.post(url, newCategory);
}

export const deleteCategory = async (categoryID: string) => {
    const url = `category/delete-category`;
    let param = { CategoryId: categoryID};
    return await axiosClient.post(url, param);
}

export const getCategoryByID = async (categoryID: string) => {
    const url = `category/get-category-by-id`;
    let param = { CategoryId: categoryID };
    return await axiosClient.post(url, param)
}

export const getAllSubCate = async (): Promise<any> => {
    const url = `category/get-all-subcategory`;
    return await axiosClient.post(url, {});
}