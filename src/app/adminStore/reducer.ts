import { isDevMode } from "@angular/core";
import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Cart, Category, Product, Tag } from "../models/admin";
import {
  addProduct,
  addProductComplete,
  addProductError,
  getAdminProducts,
  getAdminProductsComplete,
  getAllTagsComplete,
  getCategories,
  getCategoriesComplete,
  setIsAuthLoading,
  setIsAuthLoadingComplete,
  setSelectEditProduct,
} from "./actions";

export const adminFeatureKey = "admin";

export interface AdminState {
  adminProducts: Product[];
  allProducts: Product[];
  selectedProductId: string;
  categories: Category[];
  allTags: Tag[];
  cart?: Cart;
  isLoadingState: number;
  isAuthLoading: boolean;
}

const initialState: AdminState = {
  adminProducts: [],
  allProducts: [],
  selectedProductId: "",
  categories: [],
  allTags: [],
  isLoadingState: 0,
  isAuthLoading: false,
};

export const adminReducer = createReducer(
  initialState,
  on(getAdminProducts, (state) => ({
    ...state,
    isLoadingState: state.isLoadingState + 1,
  })),
  on(getAdminProductsComplete, (state, { adminProducts }) => ({
    ...state,
    adminProducts,
    isLoadingState: state.isLoadingState - 1,
  })),
  on(getAllTagsComplete, (state, { allTags }) => ({
    ...state,
    allTags,
  })),
  on(getCategories, (state) => ({
    ...state,
    isLoadingState: state.isLoadingState + 1,
  })),
  on(getCategoriesComplete, (state, { categories }) => ({
    ...state,
    categories,
    isLoadingState: state.isLoadingState - 1,
  })),
  on(setSelectEditProduct, (state, { selectedEditProduct }) => ({
    ...state,
    selectedEditProduct,
  })),
  on(addProduct, (state) => ({
    ...state,
    isLoadingState: state.isLoadingState + 1,
  })),
  on(addProductComplete, (state) => ({
    ...state,
    isLoadingState: state.isLoadingState - 1,
  })),
  on(addProductError, (state) => ({
    ...state,
    isLoadingState: state.isLoadingState - 1,
  })),
  on(setIsAuthLoading, (state) => ({
    ...state,
    isAuthLoading: true,
  })),
  on(setIsAuthLoadingComplete, (state) => ({
    ...state,
    isAuthLoading: false,
  }))
);

export const metaReducers: MetaReducer<AdminState>[] = isDevMode() ? [] : [];
