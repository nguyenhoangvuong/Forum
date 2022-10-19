import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryModel, PostModel } from "../../models/export";

interface AdminState {
  openAddPost: boolean;
  createSubCate: string;
  updateCategory: CategoryModel;
  updatePost: PostModel;
}

const initialState: AdminState = {
  openAddPost: false,
  createSubCate: "",
  updateCategory: new CategoryModel(),
  updatePost: new PostModel()
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setOpenAddPost: (state, action: PayloadAction<boolean>) => {
      state.openAddPost = action.payload;
    },

    setCreateSubCate: (state, action: PayloadAction<string>) => {
      state.createSubCate = action.payload;
    },

    setUpdateCategory: (state, action: PayloadAction<CategoryModel>) => {
      state.updateCategory = action.payload;
    },

    setUpdatePost: (state, action: PayloadAction<PostModel>) => {
      state.updatePost = action.payload;
    },
  },
});

const { actions, reducer } = adminSlice;
export const adminActions = actions;
export type { AdminState };
