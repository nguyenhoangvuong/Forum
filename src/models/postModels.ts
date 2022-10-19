export class CreatePostModel {
  PostId: string;
  Title: string;
  Descrption: string;
  Content: string;
  Image: string;
  MetaTitle: string;
  MetaKeywords: string;
  MetaDescription: string;
  PostCategoryId: string;
  TakeTime: number;
  KeyWords: string;
  LinkSource: string;
  UserId: string;
  IsVerified: number;
  FinishTime: number;

  /**
   *
   */
  constructor(
    postId: string,
    title: string,
    descrption: string,
    content: string,
    image: string,
    metaTitle: string,
    metaKeywords: string,
    metaDescription: string,
    postCategoryId: string,
    takeTime: number,
    keyWords: string,
    linkSource: string,
    userId: string,
    isVerified: number,
    finishTime: number
  ) {
    this.PostId = postId;
    this.Title = title;
    this.Descrption = descrption;
    this.Content = content;
    this.Image = image;
    this.MetaTitle = metaTitle;
    this.MetaKeywords = metaKeywords;
    this.MetaDescription = metaDescription;
    this.PostCategoryId = postCategoryId;
    this.TakeTime = takeTime;
    this.KeyWords = keyWords;
    this.LinkSource = linkSource;
    this.UserId = userId;
    this.IsVerified = isVerified;
    this.FinishTime = finishTime;
  }
}

export class PostModel {
  QuantityComment: number;
  QuantityParentComment: number;
  QuantityLike: number;
  UserLiked: number;
  _id: string;
  Title: string;
  Description: string;
  Content: string;
  Image: string;
  MetaTitle: string;
  MetaKeywords: string;
  MetaDescription: string;
  PostCategoryId: string;
  TakeTime: number;
  Keywords: string;
  LinkSource: string;
  UserId: string;
  IsVerified: number;
  DateCreated: string;
  DateUpdated: string;
  PostUrl: string;
  DateTime: string;
  TotalRows: number;
  FinishTime: number;
  IdLike: string;

  constructor(
    quantityComment: number = 0,
    quantityParentComment: number = 0,
    quantityLike: number = 0,
    userLiked: number = 0,
    _id: string = "",
    title: string = "",
    description: string = "",
    content: string = "",
    image: string = "",
    metaTitle: string = "",
    metaKeywords: string = "",
    metaDescription: string = "",
    postCategoryId: string = "",
    takeTime: number = 0,
    keywords: string = "",
    linkSource: string = "",
    userId: string = "",
    isVerified: number = 1,
    dateCreated: string = "",
    dateUpdated: string = "",
    postUrl: string = "",
    dateTime: string = "",
    totalRows: number = 0,
    finishTime: number = 0,
    idLike: string = ''
  ) {
    this.QuantityComment = quantityComment;
    this.QuantityParentComment = quantityParentComment;
    this.QuantityLike = quantityLike;
    this.UserLiked = userLiked;
    this._id = _id;
    this.Title = title;
    this.Description = description;
    this.Content = content;
    this.Image = image;
    this.MetaTitle = metaTitle;
    this.MetaKeywords = metaKeywords;
    this.MetaDescription = metaDescription;
    this.PostCategoryId = postCategoryId;
    this.TakeTime = takeTime;
    this.Keywords = keywords;
    this.LinkSource = linkSource;
    this.UserId = userId;
    this.IsVerified = isVerified;
    this.DateCreated = dateCreated;
    this.DateUpdated = dateUpdated;
    this.PostUrl = postUrl;
    this.DateTime = dateTime;
    this.TotalRows = totalRows;
    this.FinishTime = finishTime;
    this.IdLike = idLike;
  }
}
