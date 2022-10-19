export class CommentModel {
  _id: string;
  UserId: string;
  UserName: string;
  QuantityLike: number;
  ImageUser: string;
  PostId: string;
  Content: string;
  CreateDate: string;
  subComments: ChildrenCommentModel[];
  IsActive: any;

  constructor(
    _id: string = "",
    userId: string,
    postId: string,
    content: string,
    userName: string = "",
    quantityLike: number = 0,
    imageUser: string = "",
    createDate: string = "",
    subComments: ChildrenCommentModel[] = [],
    isActive: any = 1,
  ) {
    this._id = _id;
    this.UserId = userId;
    this.UserName = userName;
    this.QuantityLike = quantityLike;
    this.ImageUser = imageUser;
    this.PostId = postId;
    this.Content = content;
    this.CreateDate = createDate;
    this.subComments = subComments
    this.IsActive = isActive;
  }
}

export class ChildrenCommentModel {
  _id: string;
  UserId: string;
  UserName: string;
  ImageUser: string;
  QuantityLike: number;
  PostId: string;
  Content: string;
  ReplyToUserId: string;
  ReplyToUserName: string;
  ParentId: string;
  CreateDate: string;
  // Active: number;

  constructor(
    _id: string = "",
    userId: string = "",
    userName: string = "",
    imageUser: string = "",
    quantityLike: number = 0,
    postId: string = "",
    content: string = "",
    replyToUserId: string = "",
    replyToUserName: string = "",
    parentId: string = "",
    createDate: string = "",
    // active: number = 0
  ) {
    this._id = _id;
    this.UserId = userId;
    this.UserName = userName;
    this.ImageUser = imageUser;
    this.QuantityLike = quantityLike;
    this.PostId = postId;
    this.Content = content;
    this.ReplyToUserId = replyToUserId;
    this.ReplyToUserName = replyToUserName;
    this.ParentId = parentId;
    this.CreateDate = createDate;
    // this.Active = active;
  }
}

export class CreateUpdateComment {
  _id: string;
  UserId: string;
  PostId: string;
  Content: string;
  ReplyToUserId: string;
  ReplyToUserName: string;
  ParentId: string;
  Active: number

  constructor(
    _id: string = "",
    UserId: string,
    PostId: string,
    Content: string,
    ReplyToUserId: string = "",
    ReplyToUserName: string = "",
    ParentId: string = "",
    Active: number = 0
  ) {
    this._id = _id;
    this.UserId = UserId;
    this.PostId = PostId;
    this.Content = Content;
    this.ReplyToUserId = ReplyToUserId;
    this.ReplyToUserName = ReplyToUserName;
    this.ParentId = ParentId;
    this.Active = Active;
  }
}