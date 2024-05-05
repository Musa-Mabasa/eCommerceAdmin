import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PreviewState, previewFeatureKey } from "./reducer";
import { CorrelatedProduct, Product, UserCart } from "../models/admin";

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
        console.log(state.searchTerm);

        if (
          state.selectedCategory === "All Products" &&
          product.product.name
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase())
        ) {
          return true;
        } else if (
          state.selectedCategory === product.product.category &&
          product.product.name
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase())
        ) {
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
      })
      .filter((product) => {
        if (state.priceRangeType === "") {
          return true;
        } else if (
          state.priceRangeType === "Equals" &&
          state.lowerPriceBound &&
          product.product.price === state.lowerPriceBound
        ) {
          return true;
        } else if (
          state.priceRangeType === "Less Than" &&
          state.lowerPriceBound &&
          product.product.price < state.lowerPriceBound
        ) {
          return true;
        } else if (
          state.priceRangeType === "More Than" &&
          state.lowerPriceBound &&
          product.product.price > state.lowerPriceBound
        ) {
          return true;
        } else if (
          state.priceRangeType === "Between" &&
          state.lowerPriceBound &&
          state.upperPriceBound &&
          product.product.price > state.lowerPriceBound &&
          product.product.price < state.upperPriceBound
        ) {
          return true;
        }

        return false;
      })
      .filter((product) => {
        if (!state.cart) return true;

        return !state.userCarts?.some(
          (userCart) => userCart.productId === product.product.id
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

export const selectCart = createSelector(
  previewSelectFeature,
  (state) => state.cart
);

export const selectProductToView = createSelector(
  previewSelectFeature,
  (state) => state.productToView
);

export const selectUserCartProducts = createSelector(
  previewSelectFeature,
  (state): Product[] =>
    state.allProducts.filter((product) =>
      state.userCarts?.some((userCart) => userCart.productId === product.id)
    )
);

export const selectCorrelatedProducts = createSelector(
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

export const selectRelatedProducts = createSelector(
  previewSelectFeature,
  selectCorrelatedProducts,
  (state, correlatedProducts) => {
    if (!state.productToView) {
      return [];
    }

    return correlatedProducts.filter(
      (product) =>
        product.product.id !== state.productToView?.product.id &&
        product.product.category === state.productToView?.product.category
    );
  }
);
