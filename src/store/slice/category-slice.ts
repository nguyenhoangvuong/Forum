import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryModel } from "../../models/export";
import { NONE } from "../../utils/constants";
import { RootState } from "../app/store";

interface CategoryState {
  selected: string;
  subSelected: string;
  listCategory: CategoryModel[];
  listSubCategory: never[];
}

const initialState: CategoryState = {
  selected: NONE,
  subSelected: NONE,
  listCategory: [],
  listSubCategory: []
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },

    setListCategory: (state, action: PayloadAction<never[]>) => {
        state.listCategory = action.payload;
    },

    setListSubCategory: (state, action: PayloadAction<never[]>) => {
        state.listSubCategory = action.payload;
    },

    setSubSelected: (state, action: PayloadAction<string>) => {
      state.subSelected = action.payload;
    },
    // getCategoryByCatURL: (state, action: PayloadAction<string>): any => {
    //   let array: CategoryModel[] = [];
    //   console.log('state.listCategory', state.listCategory);
      
    //   state.listCategory.forEach((category) => {
    //     array.push(category);
    //   })
    //   return array.find((category) => category.CatUrl === action.payload);
    // }
  },
});

const { actions, reducer } = categorySlice;
export const categoryActions = actions;
export type { CategoryState };
