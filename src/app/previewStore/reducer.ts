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
  selectCategory,
  selectUpperPriceBound,
  selectLowerPriceBound,
  selectPriceRangeType,
  selectFilterTags,
} from "./actions";

export const previewFeatureKey = "preview";

export interface PreviewState {
  allProducts: Product[];
  tags: Tag[];
  categories: Category[];
  productsLoadingState: boolean;
  categoriesLoadingState: boolean;
  tagsLoadingState: boolean;
  selectedCategory: string;
  selectedTags: string[];
  priceRangeType: string;
  lowerPriceBound?: number;
  upperPriceBound?: number;
}

const initialState: PreviewState = {
  allProducts: [],
  tags: [],
  categories: [],
  productsLoadingState: false,
  categoriesLoadingState: false,
  tagsLoadingState: false,
  selectedCategory: "",
  selectedTags: [],
  priceRangeType: "",
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
  })),
  on(selectCategory, (state, { selectedCategory }) => ({
    ...state,
    selectedCategory,
  })),
  on(selectFilterTags, (state, { selectedTags }) => ({
    ...state,
    selectedTags,
  })),
  on(selectPriceRangeType, (state, { priceRangeType }) => ({
    ...state,
    priceRangeType,
  })),
  on(selectLowerPriceBound, (state, { lowerPriceBound }) => ({
    ...state,
    lowerPriceBound,
  })),
  on(selectUpperPriceBound, (state, { upperPriceBound }) => ({
    ...state,
    upperPriceBound,
  }))
);

export const metaReducers: MetaReducer<PreviewState>[] = isDevMode() ? [] : [];
