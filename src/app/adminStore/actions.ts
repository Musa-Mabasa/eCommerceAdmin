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
  props<{ productToEdit: Product }>()
);

export const setFilterBy = createAction(
  "[ADMIN] setFilterBy",
  props<{ filterBy: string }>()
);

export const setSortBy = createAction(
  "[ADMIN] setSortBy",
  props<{ sortBy: string }>()
);

export const setSearchTerm = createAction(
  "[ADMIN] SetSearchTerm",
  props<{ searchTerm: string }>()
);

//fetching state actions
export const setIsAuthLoading = createAction("[ADMIN] SetAuthLoading");

export const setIsAuthLoadingComplete = createAction(
  "[ADMIN] SetAuthLoadingComplete"
);

// add/delete actions
export const addProduct = createAction(
  "[ADMIN] AddProduct",
  props<{ productWithFile: { product: Product; file?: File } }>()
);

export const addProductComplete = createAction("[ADMIN] AddProductComplete");

export const addProductError = createAction("[ADMIN] AddProductError");

export const editProduct = createAction(
  "[ADMIN] EditProduct",
  props<{ productWithFile: { product: Product; file?: File } }>()
);

export const editProductComplete = createAction("[ADMIN] EditProductComplete");

export const editProductError = createAction("[ADMIN] EditProductError");

export const addTag = createAction(
  "[ADMIN] AddTag",
  props<{ tag: { name: string; productId: string } }>()
);

export const addTagComplete = createAction("[ADMIN] AddTagComplete");

export const deleteProduct = createAction(
  "[ADMIN] DeleteProduct",
  props<{ productId: string }>()
);

export const deleteProductComplete = createAction(
  "[ADMIN] DeleteProductComplete"
);

export const routeToPreview = createAction("[ADMIN] RouteToPreview");

export const insidePreview = createAction("[ADMIN] InsidePreview");
