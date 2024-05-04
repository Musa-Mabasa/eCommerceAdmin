import { isDevMode } from "@angular/core";
import { Product, Tag } from "../models/admin";
import { MetaReducer, createReducer, on } from "@ngrx/store";
import { getAllProducts, getAllProductsComplete } from "./actions";

export const previewFeatureKey = "preview";

export interface PreviewState {
  allProducts: Product[];
  allTags: Tag[];
  productsLoadingState: boolean;
}

const initialState: PreviewState = {
  allProducts: [],
  allTags: [],
  productsLoadingState: false,
};

export const previewReducer = createReducer(
  initialState,
  on(getAllProducts, (state) => ({
    ...state,
    productsLoadingState: true,
  })),
  on(getAllProductsComplete, (state, { allProducts }) => ({
    ...state,
    productsLoadingState: false,
    allProducts,
  }))
);

export const metaReducers: MetaReducer<PreviewState>[] = isDevMode() ? [] : [];
