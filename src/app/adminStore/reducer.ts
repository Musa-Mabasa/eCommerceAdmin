import { isDevMode } from "@angular/core";
import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Cart, Product } from "../models/admin";
import {
  getAdminCartComplete,
  getAdminProductsComplete,
  getAllStoreProductsComplete,
  setSelectEditProduct,
  setSelectPreviewProduct,
} from "./actions";

export const adminFeatureKey = "admin";

export interface AdminState {
  adminProducts: Product[];
  allProducts: Product[];
  selectedProductId: string;
  cart?: Cart;
}

const initialState: AdminState = {
  adminProducts: [],
  allProducts: [],
  selectedProductId: "",
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
  }))
);

export const metaReducers: MetaReducer<AdminState>[] = isDevMode() ? [] : [];
