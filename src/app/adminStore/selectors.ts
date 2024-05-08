import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState, adminFeatureKey } from "./reducer";
import { Category, CorrelatedProduct } from "../models/admin";

export const adminSelectFeature =
  createFeatureSelector<AdminState>(adminFeatureKey);

export const selectAdminProductsWithTags = createSelector(
  adminSelectFeature,
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
          product.product.name
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase())
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

export const selectCategories = createSelector(adminSelectFeature, (state) => {
  const newCategories = [
    ...state.categories.filter(({ name }) => name === "All Products"),
    ...state.categories.filter(({ name }) => name !== "All Products"),
  ];
  return newCategories;
});

export const selectFilterBy = createSelector(
  adminSelectFeature,
  (state) => state.filterBy
);

export const selectSortBy = createSelector(
  adminSelectFeature,
  (state) => state.sortBy
);

export const selectProductToEdit = createSelector(
  adminSelectFeature,
  (state) => state.productToEdit
);

export const selectCart = createSelector(
  adminSelectFeature,
  (state) => state.cart
);

export const selectProductLoadingState = createSelector(
  adminSelectFeature,
  (state) => state.productLoadingState
);

export const selectAddLoadingState = createSelector(
  adminSelectFeature,
  (state) => state.addingLoadingState
);

export const selectEditLoadingState = createSelector(
  adminSelectFeature,
  (state) => state.editLoadingState
);

export const selectCategoriesLoadingState = createSelector(
  adminSelectFeature,
  (state) => state.categoryLoadingState
);

export const selectTagsLoadingState = createSelector(
  adminSelectFeature,
  (state) => state.addTagLoadingState
);

export const selectIsAuthLoading = createSelector(
  adminSelectFeature,
  (state) => state.isAuthLoading
);

export const selectAdminProductsLoading = createSelector(
  adminSelectFeature,
  (state) =>
    state.productLoadingState ||
    state.categoryLoadingState ||
    state.tagsLoadingState
);
