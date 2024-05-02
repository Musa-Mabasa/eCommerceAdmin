import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState, adminFeatureKey } from "./reducer";
import { Category, CorrelatedProduct } from "../models/admin";

export const selectFeature = createFeatureSelector<AdminState>(adminFeatureKey);

export const selectAdminProductsWithTags = createSelector(
  selectFeature,
  (state): CorrelatedProduct[] => {
    if (!(state.adminProducts && state.allTags)) {
      return [];
    }

    return state.adminProducts.map((product) => {
      const tags = state.allTags.filter((tag) => tag.productId == product.id);
      return { product, tags };
    });
  }
);

export const selectCategories = createSelector(selectFeature, (state) => {
  const newCategories = [
    ...state.categories.filter(({ name }) => name === "All Products"),
    ...state.categories.filter(({ name }) => name !== "All Products"),
  ];
  return newCategories;
});

export const selectAllProductsWithTags = createSelector(
  selectFeature,
  (state): CorrelatedProduct[] => {
    if (!(state.allProducts && state.allTags)) {
      return [];
    }

    return state.allProducts.map((product) => {
      const tags = state.allTags.filter((tag) => tag.productId == product.id);
      return { product, tags };
    });
  }
);

export const selectSelectedEditProduct = createSelector(
  selectFeature,
  (state) =>
    state.adminProducts.find(
      (product) => state.selectedProductId === product.id
    )
);

export const selectSelectedPreviewProduct = createSelector(
  selectFeature,
  (state) =>
    state.allProducts.find((product) => state.selectedProductId === product.id)
);

export const selectCart = createSelector(selectFeature, (state) => state.cart);

export const selectIsLoadingState = createSelector(selectFeature, (state) =>
  state.isLoadingState === 0 ? false : true
);

export const selectIsAuthLoading = createSelector(
  selectFeature,
  (state) => state.isAuthLoading
);
