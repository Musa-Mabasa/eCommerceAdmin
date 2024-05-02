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
  getProductById,
  getProductByIdComplete,
  getProductByIdError,
  setFilterBy,
  setIsAuthLoading,
  setIsAuthLoadingComplete,
  setSearchTerm,
  setSelectEditProduct,
  setSortBy,
} from "./actions";

export const adminFeatureKey = "admin";

export interface AdminState {
  adminProducts: Product[];
  allProducts: Product[];
  productToEdit?: Product;
  categories: Category[];
  filterBy: string;
  sortBy: string;
  searchTerm: string;
  allTags: Tag[];
  cart?: Cart;
  isLoadingState: number;
  isAuthLoading: boolean;
}

const initialState: AdminState = {
  adminProducts: [],
  allProducts: [],
  categories: [],
  filterBy: "All Products",
  sortBy: "",
  searchTerm: "",
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
  on(getProductById, (state) => ({
    ...state,
    isLoadingState: state.isLoadingState + 1,
  })),
  on(getProductByIdComplete, (state, { product }) => ({
    ...state,
    productToEdit: product,
    isLoadingState: state.isLoadingState - 1,
  })),
  on(getProductByIdError, (state) => ({
    ...state,
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
  on(setSelectEditProduct, (state, { productToEdit }) => ({
    ...state,
    productToEdit,
  })),
  on(setFilterBy, (state, { filterBy }) => ({
    ...state,
    filterBy,
  })),
  on(setSortBy, (state, { sortBy }) => ({
    ...state,
    sortBy,
  })),
  on(setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
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
