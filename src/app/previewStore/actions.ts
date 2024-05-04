import { createAction, props } from "@ngrx/store";
import { Product } from "../models/admin";

export const getAllProducts = createAction("[PREVIEW] GetAllProducts");

export const getAllProductsComplete = createAction(
  "[PREVIEW] GetAllProductsComplete",
  props<{ allProducts: Product[] }>()
);
