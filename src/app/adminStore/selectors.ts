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
    const products = state.adminProducts
      .map((product) => {
        const tags = state.allTags.filter((tag) => tag.productId == product.id);
        return { product, tags };
      })
      .filter((product) => {
        if (
          state.filterBy === "All Products" &&
          product.product.name.includes(state.searchTerm)
        ) {
          return true;
        } else if (
          state.filterBy === product.product.category &&
          product.product.name.includes(state.searchTerm)
        ) {
          return true;
        }

        return false;
      });

    if (state.sortBy === "price") {
      products.sort((a, b) => a.product.price - b.product.price);
    } else if (state.sortBy === "name") {
      products.sort((a, b) => a.product.name.localeCompare(b.product.name));
    } else if (state.sortBy === "quantity") {
      products.sort((a, b) => b.product.quantity - a.product.quantity);
    }

    return products;
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

export const selectFilterBy = createSelector(
  selectFeature,
  (state) => state.filterBy
);

export const selectSortBy = createSelector(
  selectFeature,
  (state) => state.sortBy
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
