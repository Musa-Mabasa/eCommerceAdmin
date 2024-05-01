import { createAction, props } from "@ngrx/store";
import { Cart, Category, Product, Tag } from "../models/admin";

// get actions
export const getAdminProducts = createAction(
  "[ADMIN] GetAdminProducts",
  props<{ adminId: string }>()
);

export const getAdminProductsComplete = createAction(
  "[ADMIN] GetAdminProductsComplete",
  props<{ adminProducts: Product[] }>()
);

export const getAllTags = createAction("[ADMIN] GetAllTags");

export const getAllTagsComplete = createAction(
  "[ADMIN] GetAllTagsComplete",
  props<{ allTags: Tag[] }>()
);

export const getCategories = createAction("[ADMIN] GetCategories");

export const getCategoriesComplete = createAction(
  "[ADMIN] GetCategoriesComplete",
  props<{ categories: Category[] }>()
);

// user select actions
export const setSelectEditProduct = createAction(
  "[ADMIN] SetSelectEditProduct",
  props<{ selectedEditProduct: Product }>()
);

//fetching state actions
export const setIsAuthLoading = createAction("[ADMIN] SetAuthLoading");

export const setIsAuthLoadingComplete = createAction(
  "[ADMIN] SetAuthLoadingComplete"
);

// add/delete actions
export const addProduct = createAction(
  "[ADMIN] AddProduct",
  props<{ product: Product }>()
);

export const addProductComplete = createAction("[ADMIN] AddProductComplete");

export const addProductError = createAction("[ADMIN] AddProductError");
