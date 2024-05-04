import { isDevMode } from "@angular/core";
import { Cart, Category, Product, Tag } from "../models/admin";
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
  addToSelectedTags,
  removeFromSelectedTags,
  setSearchTerm,
  getCart,
  getCartComplete,
} from "./actions";

export const previewFeatureKey = "preview";

export interface PreviewState {
  allProducts: Product[];
  cart?: Cart;
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
  searchTerm: string;
}

const initialState: PreviewState = {
  allProducts: [],
  tags: [],
  categories: [],
  productsLoadingState: false,
  categoriesLoadingState: false,
  tagsLoadingState: false,
  selectedCategory: "All Products",
  selectedTags: [],
  priceRangeType: "",
  searchTerm: "",
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
  on(getCartComplete, (state, { cart }) => ({
    ...state,
    cart,
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
  on(addToSelectedTags, (state, { tag }) => ({
    ...state,
    selectedTags: [...state.selectedTags, tag],
  })),
  on(removeFromSelectedTags, (state, { tag }) => ({
    ...state,
    selectedTags: state.selectedTags.filter(
      (selectedTag) => selectedTag !== tag
    ),
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
  })),
  on(setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  }))
);

export const metaReducers: MetaReducer<PreviewState>[] = isDevMode() ? [] : [];
