import { createSlice } from '@reduxjs/toolkit';
import { ActionModalCategoryEnum } from '@/enums';
import { CategoryI } from '@/interfaces';

export interface AdminState {
  //Category
  categories: CategoryI[];
  isOpenModalCategory: { active: boolean; type: ActionModalCategoryEnum };
  activeCategory: CategoryI | null;
}

const initialState: AdminState = {
  //Category
  categories: [],
  isOpenModalCategory: { active: false, type: ActionModalCategoryEnum.NONE },
  activeCategory: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Category
    setCategoriesAdmin: (state, action) => {
      state.categories = action.payload;
      return state;
    },
    addCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
      return state;
    },
    updateCategory: (state, action) => {
      state.categories = state.categories.map((c) => {
        if (c._id === action.payload._id) {
          c = action.payload;
          return c;
        }
        return c;
      });
      return state;
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter((c: CategoryI) => c._id !== action.payload);
      return state;
    },
    toogleModalCategory: (state, action) => {
      state.isOpenModalCategory.active = !state.isOpenModalCategory.active;
      state.isOpenModalCategory.type = action.payload;
      return state;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
      return state;
    },
  },
});

export const {
  //Category
  setCategoriesAdmin,
  addCategory,
  updateCategory,
  removeCategory,
  toogleModalCategory,
  setActiveCategory,
} = adminSlice.actions;
