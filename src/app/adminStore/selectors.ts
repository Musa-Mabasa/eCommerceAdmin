import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState, adminFeatureKey } from "./reducer";

export const selectFeature = createFeatureSelector<AdminState>(adminFeatureKey);

export const selectAdminProducts = createSelector(
  selectFeature,
  (state) => state.adminProducts
);

export const selectAllProducts = createSelector(
  selectFeature,
  (state) => state.allProducts
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

export const selectIsAuthLoading = createSelector(
  selectFeature,
  (state) => state.isAuthLoading
);
