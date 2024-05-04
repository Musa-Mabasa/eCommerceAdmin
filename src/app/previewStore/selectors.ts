import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PreviewState, previewFeatureKey } from "./reducer";
import { CorrelatedProduct } from "../models/admin";

export const previewSelectFeature =
  createFeatureSelector<PreviewState>(previewFeatureKey);

export const selectAllProductsWithTags = createSelector(
  previewSelectFeature,
  (state): CorrelatedProduct[] => {
    if (!(state.allProducts && state.tags)) {
      return [];
    }
    const products = state.allProducts
      .map((product) => {
        const tags = state.tags.filter((tag) => tag.productId == product.id);
        return { product, tags };
      })
      .filter((product) => {
        if (state.selectedCategory === "All Products") {
          return true;
        } else if (state.selectedCategory === product.product.category) {
          return true;
        }
        return false;
      })
      .filter((product) => {
        if (!state.selectedTags.length) {
          return true;
        }
        return product.tags.some((tag) =>
          state.selectedTags.includes(tag.name)
        );
      });

    return products;
  }
);

export const selectCategories = createSelector(
  previewSelectFeature,
  (state) => {
    const newCategories = [
      ...state.categories.filter(({ name }) => name === "All Products"),
      ...state.categories.filter(({ name }) => name !== "All Products"),
    ];
    return newCategories;
  }
);

export const selectTags = createSelector(
  previewSelectFeature,
  (state) => state.tags
);

export const selectSelectedTags = createSelector(
  previewSelectFeature,
  (state) => state.selectedTags
);
