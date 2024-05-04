import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PreviewState, previewFeatureKey } from "./reducer";
import { CorrelatedProduct } from "../models/admin";

export const previewSelectFeature =
  createFeatureSelector<PreviewState>(previewFeatureKey);

export const selectAllProductsWithTags = createSelector(
  previewSelectFeature,
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

export const selectCategories = createSelector(previewSelectFeature, (state) =>
  state.categories.filter((category) => category.name !== "All Products")
);
