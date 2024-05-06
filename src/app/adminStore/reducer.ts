import { isDevMode } from "@angular/core";
import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Cart, Category, Product, Tag } from "../models/admin";
import {
  addProduct,
  addProductComplete,
  addProductError,
  addTag,
  addTagComplete,
  editProduct,
  editProductComplete,
  editProductError,
  getAdminProducts,
  getAdminProductsComplete,
  getAllTags,
  getAllTagsComplete,
  getCategories,
  getCategoriesComplete,
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
  categoryLoadingState: boolean;
  tagsLoadingState: boolean;
  addingLoadingState: boolean;
  editLoadingState: boolean;
  addTagLoadingState: boolean;
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
  categoryLoadingState: false,
  tagsLoadingState: false,
  addingLoadingState: false,
  editLoadingState: false,
  addTagLoadingState: false,
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
  on(getAllTags, (state) => ({
    ...state,
    tagsLoadingState: true,
  })),
  on(getAllTagsComplete, (state, { allTags }) => ({
    ...state,
    allTags,
    tagsLoadingState: false,
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
  on(addProductError, (state) => ({
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
  on(editProductError, (state) => ({
    ...state,
    editLoadingState: false,
  })),
  on(addTag, (state) => ({
    ...state,
    addTagLoadingState: true,
  })),
  on(addTagComplete, (state) => ({
    ...state,
    addTagLoadingState: false,
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
