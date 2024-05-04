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
        if (state.selectedCategory === "") {
          return true;
        } else if (state.selectedCategory === product.product.category) {
          return true;
        }
        return false;
      });

    return products;
  }
);

export const selectCategories = createSelector(previewSelectFeature, (state) =>
  state.categories.filter((category) => category.name !== "All Products")
);

export const selectTags = createSelector(
  previewSelectFeature,
  (state) => state.tags
);
