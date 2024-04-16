import { isDevMode } from "@angular/core";
import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Cart, Product } from "../models/admin";
import {
  getAdminCartComplete,
  getAdminProductsComplete,
  getAllStoreProductsComplete,
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
  cart?: Cart;
  isAuthLoading: boolean;
}

const initialState: AdminState = {
  adminProducts: [],
  allProducts: [],
  selectedProductId: "",
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
