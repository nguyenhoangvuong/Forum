import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryModel, CommentModel, PostModel } from "../../models/export";

interface CommentState {
  listComment: CommentModel[];

}

const initialState: CommentState = {
    listComment: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setListComment: (state, action: PayloadAction<never[]>) => {
      state.listComment = action.payload;
    },
  },
});

const { actions, reducer } = commentSlice;
export const commentActions = actions;
export type { CommentState };
