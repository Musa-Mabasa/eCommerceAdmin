import { isDevMode } from "@angular/core";
import { Category, Product, Tag } from "../models/admin";
import { MetaReducer, createReducer, on } from "@ngrx/store";
import {
  getAllProducts,
  getAllProductsComplete,
  getCategories,
  getCategoriesComplete,
  getTags,
  getTagsComplete,
} from "./actions";

export const previewFeatureKey = "preview";

export interface PreviewState {
  allProducts: Product[];
  tags: Tag[];
  categories: Category[];
  productsLoadingState: boolean;
  categoriesLoadingState: boolean;
  tagsLoadingState: boolean;
}

const initialState: PreviewState = {
  allProducts: [],
  tags: [],
  categories: [],
  productsLoadingState: false,
  categoriesLoadingState: false,
  tagsLoadingState: false,
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
  })),
  on(getTags, (state) => ({
    ...state,
    tagsLoadingState: true,
  })),
  on(getTagsComplete, (state, { tags }) => ({
    ...state,
    tagsLoadingState: false,
    tags,
  }))
);

export const metaReducers: MetaReducer<PreviewState>[] = isDevMode() ? [] : [];
