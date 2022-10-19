export class LikeModel {
    IdLike: string;
    UserId: string;
    PostId: string;
    CommentId: string;
    // Type: number;
    TypeLike: number

    /**
     *
     */
    constructor(
        IdLike: string = "",
        UserId: string,
        PostId: string,
        CommentId: string,
        // Type: number,
        TypeLike: number = 2
    ) {
        this.IdLike = IdLike;
        this.UserId = UserId;
        this.PostId = PostId;
        this.CommentId = CommentId;
        // this.Type = Type;
        this.TypeLike = TypeLike;
    }
}