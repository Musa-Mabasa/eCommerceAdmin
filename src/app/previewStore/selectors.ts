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
    return state.allProducts.map((product) => {
      const tags = state.tags.filter((tag) => tag.productId == product.id);
      return { product, tags };
    });
  }
);

export const selectCategories = createSelector(previewSelectFeature, (state) =>
  state.categories.filter((category) => category.name !== "All Products")
);

export const selectTags = createSelector(
  previewSelectFeature,
  (state) => state.tags
);
