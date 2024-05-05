import { isDevMode } from "@angular/core";
import {
  Cart,
  Category,
  CorrelatedProduct,
  Data,
  Product,
  Tag,
  UserCart,
} from "../models/admin";
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
  getCartComplete,
  getUserCartsComplete,
  setProductToView,
  setCurrency,
  getCurrencyConversionComplete,
} from "./actions";

export const previewFeatureKey = "preview";

export interface PreviewState {
  allProducts: Product[];
  cart?: Cart;
  userCarts?: UserCart[];
  tags: Tag[];
  categories: Category[];
  productToView?: CorrelatedProduct;
  productsLoadingState: boolean;
  categoriesLoadingState: boolean;
  tagsLoadingState: boolean;
  selectedCategory: string;
  selectedTags: string[];
  priceRangeType: string;
  lowerPriceBound?: number;
  upperPriceBound?: number;
  searchTerm: string;
  userCurrency: string;
  currencyConversion?: Data;
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
  userCurrency: "USD",
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
  on(getUserCartsComplete, (state, { userCarts }) => ({
    ...state,
    userCarts,
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
    categoriesLoadingState: false,
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
  })),
  on(setProductToView, (state, { productToView }) => ({
    ...state,
    productToView,
  })),
  on(setCurrency, (state, { userCurrency }) => ({
    ...state,
    userCurrency,
  })),
  on(getCurrencyConversionComplete, (state, { currencyConversion }) => ({
    ...state,
    currencyConversion,
  }))
);

export const metaReducers: MetaReducer<PreviewState>[] = isDevMode() ? [] : [];
