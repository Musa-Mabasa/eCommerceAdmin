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
  setFilterBy,
  setIsAuthLoading,
  setIsAuthLoadingComplete,
  setSelectEditProduct,
  setSortBy,
} from "./actions";

export const adminFeatureKey = "admin";

export interface AdminState {
  adminProducts: Product[];
  allProducts: Product[];
  selectedProductId: string;
  categories: Category[];
  filterBy: string;
  sortBy: string;
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
  filterBy: "All Products",
  sortBy: "",
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
  on(setFilterBy, (state, { filterBy }) => ({
    ...state,
    filterBy,
  })),
  on(setSortBy, (state, { sortBy }) => ({
    ...state,
    sortBy,
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
