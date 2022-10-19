import { CategoryModel, CreatePostModel, CreateUpdateCategory, PostModel, UserModel, UserUpdateModel } from "../models/export";
import Timeline, { TitleSlide } from "timelinejs-react";


export const UserUpdateMapping = (user: UserModel): UserUpdateModel => {
  let userUpdate = new UserUpdateModel(
    user._id,
    user.Password,
    user.FullName,
    user.Email,
    user.Phone,
    user.Address,
    user.Image,
    user.RoleId,
    user.Status
  );

  return userUpdate;
};

export const PostToTilteSlideMapping = (post: PostModel): TitleSlide => {
  let createDate = String(post.DateCreated).split(" ")[0];  
  let createDay = Number(createDate.split("/")[0]);
  let createMonth = Number(createDate.split("/")[1]);
  let createYear = Number(createDate.split("/")[2]);

  let result = {
    start_date: {
      year: createYear,
      month: createMonth,
      day: createDay,
    },
    media: {
      url: post.Image,
      thumbnail: post.Image,
      caption: "",
      link: "",
    },
    end_date: {
      year: createYear,
      month: createMonth,
      day: createDay,
    },
    unique_id: post._id,
    text: {
      headline: post.Title,
      text: post.LinkSource,
    },
    group: "",
    background: {},
  };
  return  result;
}

export const CreateUpdateCategoryMapping = (category: CategoryModel): CreateUpdateCategory => {
  let result = new CreateUpdateCategory(
    category._id,
    category.Name,
    category.Image,
    category.CategoryParentId,
    category.Order,
    category.MetaTitle,
    category.MetaDescription,
    category.MetaKeyWords,
    category.KeyWords,
    category.Status
  );
  return result;
}

export const CreateUpdatePostMapping = (post: PostModel): CreatePostModel => {
  let result = new CreatePostModel(
    post._id,
    post.Title,
    post.Description,
    post.Content,
    post.Image,
    post.MetaTitle,
    post.MetaKeywords,
    post.MetaDescription,
    post.PostCategoryId,
    post.TakeTime,
    post.Keywords,
    post.LinkSource,
    post.UserId,
    post.IsVerified,
    post.FinishTime,
  );
  return result;
}