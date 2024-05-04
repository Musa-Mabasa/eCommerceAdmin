import { createAction, props } from "@ngrx/store";
import { Category, Product, Tag } from "../models/admin";

export const getAllProducts = createAction("[PREVIEW] GetAllProducts");

export const getAllProductsComplete = createAction(
  "[PREVIEW] GetAllProductsComplete",
  props<{ allProducts: Product[] }>()
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

export const selectFilterTags = createAction(
  "[PREVIEW] SelectTags",
  props<{ selectedTags: string[] }>()
);

export const selectPriceRangeType = createAction(
  "[PREVIEW] SelectPriceRangeType",
  props<{ priceRangeType: string }>()
);

export const selectLowerPriceBound = createAction(
  "[PREVIEW] SelectLowerPriceBound",
  props<{ lowerPriceBound?: number  }>()
);

export const selectUpperPriceBound = createAction(
  "[PREVIEW] SelectUpperPriceBound",
  props<{ upperPriceBound?: number }>()
);
