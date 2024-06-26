import { createAction, props } from "@ngrx/store";
import {
  Cart,
  Category,
  CorrelatedProduct,
  Data,
  Product,
  Tag,
  UserCart,
} from "../models/admin";

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

export const getUserCarts = createAction(
  "[PREVIEW] GetUserCarts",
  props<{ cartId: string }>()
);

export const getUserCartsComplete = createAction(
  "[PREVIEW] GetUserCartsComplete",
  props<{ userCarts: UserCart[] }>()
);

export const addProductToCart = createAction(
  "[PREVIEW] AddProductToCart",
  props<{ productToAdd: { cartId: string; product: CorrelatedProduct } }>()
);

export const addProductToCartComplete = createAction(
  "[PREVIEW] AddProductToCartComplete"
);

export const deleteProductFromCart = createAction(
  "[PREVIEW] DeleteProductFromCart",
  props<{ productToDelete: { cartId: string; productId: string } }>()
);

export const deleteProductFromCartComplete = createAction(
  "[PREVIEW] DeleteProductFromCartComplete"
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

export const setProductToView = createAction(
  "[PREVIEW] SelectProductToView",
  props<{ productToView: CorrelatedProduct }>()
);

export const setCurrency = createAction(
  "[PREVIEW] SetCurrency",
  props<{ userCurrency: string }>()
);

export const getCurrencyConversion = createAction(
  "[PREVIEW] GetCurrencyConversion",
  props<{ userCurrency: string }>()
);

export const getCurrencyConversionComplete = createAction(
  "[PREVIEW] GetCurrencyConversionComplete",
  props<{ currencyConversion: Data }>()
);
