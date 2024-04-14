import { isDevMode } from "@angular/core";
import { createReducer, MetaReducer, on } from "@ngrx/store";
import { Cart, Product } from "../models/admin";
import {
  getAdminCartComplete,
  getAdminProductsComplete,
  getAllStoreProductsComplete,
} from "./actions";

export const adminFeatureKey = "admin";

export interface AdminState {
  adminProducts: Product[];
  allProducts: Product[];
  cart?: Cart;
}

const initialState: AdminState = {
  adminProducts: [],
  allProducts: [],
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
  }))
);

export const metaReducers: MetaReducer<AdminState>[] = isDevMode() ? [] : [];
