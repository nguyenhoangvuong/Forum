import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostModel } from "../../models/export";
import { NONE } from "../../utils/constants";

interface PostState {
  content: string;
  listAllPost: PostModel[];
  postSelected: PostModel;
}

const initialState: PostState = {
  content: NONE,
  listAllPost: [],
  postSelected: new PostModel()
};

export const postSlide = createSlice({
  name: "post",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setListAllPost: (state, action: PayloadAction<never[]>) => {
      state.listAllPost = action.payload;
    },
    setPostSelected: (state, action: PayloadAction<PostModel>) => {
      state.postSelected = action.payload;
    },
  },
});

const { actions, reducer } = postSlide;
export const postActions = actions;
export type { PostState };
