import { isDevMode } from "@angular/core";
import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Cart, Category, Product, Tag } from "../models/admin";
import {
  addProduct,
  addProductComplete,
  addProductError,
  editProduct,
  editProductComplete,
  editProductError,
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
  productLoadingState: boolean;
  addingLoadingState: boolean;
  editLoadingState: boolean;
  categoryLoadingState: boolean;
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
  productLoadingState: false,
  addingLoadingState: false,
  editLoadingState: false,
  categoryLoadingState: false,
  isAuthLoading: false,
};

export const adminReducer = createReducer(
  initialState,
  on(getAdminProducts, (state) => ({
    ...state,
    productLoadingState: true,
  })),
  on(getAdminProductsComplete, (state, { adminProducts }) => ({
    ...state,
    adminProducts,
    productLoadingState: false,
  })),
  on(getProductById, (state) => ({
    ...state,
    productLoadingState: true,
  })),
  on(getProductByIdComplete, (state, { product }) => ({
    ...state,
    productToEdit: product,
    productLoadingState: false,
  })),
  on(getProductByIdError, (state) => ({
    ...state,
    productLoadingState: false,
  })),
  on(getAllTagsComplete, (state, { allTags }) => ({
    ...state,
    allTags,
  })),
  on(getCategories, (state) => ({
    ...state,
    categoryLoadingState: true,
  })),
  on(getCategoriesComplete, (state, { categories }) => ({
    ...state,
    categories,
    categoryLoadingState: false,
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
    addingLoadingState: true,
  })),
  on(addProductComplete, (state) => ({
    ...state,
    addingLoadingState: false,
  })),
  on(editProduct, (state) => ({
    ...state,
    editLoadingState: true,
  })),
  on(editProductComplete, (state) => ({
    ...state,
    editLoadingState: false,
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
