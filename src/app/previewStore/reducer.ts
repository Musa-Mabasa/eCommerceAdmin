import { isDevMode } from "@angular/core";
import { Category, Product, Tag } from "../models/admin";
import { MetaReducer, createReducer, on } from "@ngrx/store";
import {
  getAllProducts,
  getAllProductsComplete,
  getCategories,
  getCategoriesComplete,
} from "./actions";

export const previewFeatureKey = "preview";

export interface PreviewState {
  allProducts: Product[];
  allTags: Tag[];
  categories: Category[];
  productsLoadingState: boolean;
  categoriesLoadingState: boolean;
}

const initialState: PreviewState = {
  allProducts: [],
  allTags: [],
  categories: [],
  productsLoadingState: false,
  categoriesLoadingState: false,
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
  })),
  on(getCategories, (state) => ({
    ...state,
    categoriesLoadingState: true,
  })),
  on(getCategoriesComplete, (state, { categories }) => ({
    ...state,
    productsLoadingState: false,
    categories,
  }))
);

export const metaReducers: MetaReducer<PreviewState>[] = isDevMode() ? [] : [];
