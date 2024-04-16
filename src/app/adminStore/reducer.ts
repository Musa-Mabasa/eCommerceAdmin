import { isDevMode } from "@angular/core";
import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Cart, Product, Tag } from "../models/admin";
import {
  getAdminCartComplete,
  getAdminProductsComplete,
  getAllStoreProductsComplete,
  getAllTagsComplete,
  setIsAuthLoading,
  setIsAuthLoadingComplete,
  setSelectEditProduct,
  setSelectPreviewProduct,
} from "./actions";

export const adminFeatureKey = "admin";

export interface AdminState {
  adminProducts: Product[];
  allProducts: Product[];
  selectedProductId: string;
  allTags: Tag[];
  cart?: Cart;
  isAuthLoading: boolean;
}

const initialState: AdminState = {
  adminProducts: [],
  allProducts: [],
  selectedProductId: "",
  allTags: [],
  isAuthLoading: false,
};

export const adminReducer = createReducer(
  initialState,
  on(getAdminProductsComplete, (state, { adminProducts }) => ({
    ...state,
    adminProducts,
  })),
  on(getAllStoreProductsComplete, (state, { allProducts }) => ({
    ...state,
    allProducts,
  })),
  on(getAllTagsComplete, (state, { allTags }) => ({
    ...state,
    allTags,
  })),
  on(getAdminCartComplete, (state, { cart }) => ({
    ...state,
    cart,
  })),
  on(setSelectEditProduct, (state, { selectedEditProduct }) => ({
    ...state,
    selectedEditProduct,
  })),
  on(setSelectPreviewProduct, (state, { selectedPreviewProduct }) => ({
    ...state,
    selectedPreviewProduct,
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
