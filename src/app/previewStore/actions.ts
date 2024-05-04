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
