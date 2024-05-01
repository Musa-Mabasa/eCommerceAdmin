import { createAction, props } from "@ngrx/store";
import { Cart, Product, Tag } from "../models/admin";

export const getAllStoreProducts = createAction("[ADMIN] GetAllStoreProducts");

export const getAllStoreProductsComplete = createAction(
  "[ADMIN] GetAllStoreProductsComplete",
  props<{ allProducts: Product[] }>()
);

export const getAdminCart = createAction(
  "[ADMIN] GetAdminCart",
  props<{ adminId: string }>()
);

export const getAdminCartComplete = createAction(
  "[ADMIN] GetAdminCartComplete",
  props<{ cart: Cart }>()
);

export const setSelectPreviewProduct = createAction(
  "[ADMIN] SetSelectPreviewProduct",
  props<{ selectedPreviewProduct: Product }>()
);
