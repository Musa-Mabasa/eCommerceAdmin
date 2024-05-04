import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PreviewState, previewFeatureKey } from "./reducer";
import { Category, CorrelatedProduct } from "../models/admin";

export const selectFeature = createFeatureSelector<PreviewState>(previewFeatureKey);

export const selectAllProductsWithTags = createSelector(
  selectFeature,
  (state): CorrelatedProduct[] => {
    if (!(state.allProducts && state.allTags)) {
      return [];
    }
    return state.allProducts.map((product) => {
        const tags = state.allTags.filter((tag) => tag.productId == product.id);
        return { product, tags };
      })

  }
);

