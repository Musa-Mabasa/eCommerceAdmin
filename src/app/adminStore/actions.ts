import { createAction, props } from "@ngrx/store";
import { Cart, Product, Tag } from "../models/admin";

export const getAdminProducts = createAction(
  "[ADMIN] GetAdminProducts",
  props<{ adminId: string }>()
);

export const getAdminProductsComplete = createAction(
  "[ADMIN] GetAdminProductsComplete",
  props<{ adminProducts: Product[] }>()
);

export const getAllStoreProducts = createAction("[ADMIN] GetAllStoreProducts");

export const getAllStoreProductsComplete = createAction(
  "[ADMIN] GetAllStoreProductsComplete",
  props<{ allProducts: Product[] }>()
);

export const getAllTags = createAction("[ADMIN] GetAllTags");

export const getAllTagsComplete = createAction(
  "[ADMIN] GetAllTagsComplete",
  props<{ allTags: Tag[] }>()
);

export const getAdminCart = createAction(
  "[ADMIN] GetAdminCart",
  props<{ adminId: string }>()
);

export const getAdminCartComplete = createAction(
  "[ADMIN] GetAdminCartComplete",
  props<{ cart: Cart }>()
);

export const setSelectEditProduct = createAction(
  "[ADMIN] SetSelectEditProduct",
  props<{ selectedEditProduct: Product }>()
);

export const setSelectPreviewProduct = createAction(
  "[ADMIN] SetSelectPreviewProduct",
  props<{ selectedPreviewProduct: Product }>()
);

export const setIsAuthLoading = createAction("[ADMIN] SetAuthLoading");

export const setIsAuthLoadingComplete = createAction(
  "[ADMIN] SetAuthLoadingComplete"
);