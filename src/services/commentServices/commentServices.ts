import { CommentModel, LikeModel } from "../../models/export";
import { DEFAULT_PAGE_SIZE_5 } from "../../utils/constants";
import { axiosClient } from "../export";

export const getCommentByPostID = async (postID: string, pageNumber: number, pageSize: number = DEFAULT_PAGE_SIZE_5, isActive: any = 1): Promise<any> => {
    const url = `comment/get-comment-by-postid`;
    let param = {
        PostId: postID,
        PageNumber: pageNumber,
        PageSize: pageSize,
        IsActive: isActive
      };
    return await axiosClient.post(url, param);
}

export const createUpdateComment = async (comment: any): Promise<any> => {
    const url = `comment/create-update-comment`;
    return await axiosClient.post(url, comment);
}

export const createUpdateLike = async (like: LikeModel): Promise<any> => {
    const url =  `like/create-update-like`;
    return await axiosClient.post(url, like);
}