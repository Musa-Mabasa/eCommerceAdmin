import { createAction, props } from "@ngrx/store";
import { Cart, Category, Product, Tag } from "../models/admin";

export const getAllProducts = createAction("[PREVIEW] GetAllProducts");

export const getAllProductsComplete = createAction(
  "[PREVIEW] GetAllProductsComplete",
  props<{ allProducts: Product[] }>()
);

export const getCart = createAction(
  "[PREVIEW] GetCart",
  props<{ userId: string }>()
);

export const getCartComplete = createAction(
  "[PREVIEW] GetCartComplete",
  props<{ cart: Cart }>()
);

export const getCategories = createAction("[PREVIEW] GetCategories");

export const getCategoriesComplete = createAction(
  "[PREVIEW] GetCategoriesComplete",
  props<{ categories: Category[] }>()
);

export const getTags = createAction("[PREVIEW] GetTags");

export const getTagsComplete = createAction(
  "[PREVIEW] GetTagsComplete",
  props<{ tags: Tag[] }>()
);

export const selectCategory = createAction(
  "[PREVIEW] SelectCategory",
  props<{ selectedCategory: string }>()
);

export const addToSelectedTags = createAction(
  "[PREVIEW] AddToSelectedTags",
  props<{ tag: string }>()
);

export const removeFromSelectedTags = createAction(
  "[PREVIEW] RemoveFromSelectedTags",
  props<{ tag: string }>()
);

export const selectPriceRangeType = createAction(
  "[PREVIEW] SelectPriceRangeType",
  props<{ priceRangeType: string }>()
);

export const selectLowerPriceBound = createAction(
  "[PREVIEW] SelectLowerPriceBound",
  props<{ lowerPriceBound?: number }>()
);

export const selectUpperPriceBound = createAction(
  "[PREVIEW] SelectUpperPriceBound",
  props<{ upperPriceBound?: number }>()
);

export const setSearchTerm = createAction(
  "[PREVIEW] SetSearchTerm",
  props<{ searchTerm: string }>()
);
