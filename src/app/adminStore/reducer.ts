import { isDevMode } from "@angular/core";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from "@ngrx/store";
import { Cart, Product } from "../models/admin";
import {
  getAdminCartComplete,
  getAdminProducts,
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

export const adminReducers = createReducer(
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
