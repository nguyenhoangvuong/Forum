import { categorySlice, CategoryState } from "./category-slice";
import { adminSlice, AdminState } from "./admin-slice";
import { postSlide, PostState } from "./post-slide";
import { userSlide, UserState } from "./user-slice";
import { commentSlice, CommentState } from "./comment-slice";

export { categorySlice, adminSlice, postSlide, userSlide, commentSlice };

export type { CategoryState, AdminState, PostState, UserState, CommentState };

export default { categorySlice, adminSlice, postSlide, userSlide, commentSlice };
