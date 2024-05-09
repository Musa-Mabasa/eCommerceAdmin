import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PreviewState, previewFeatureKey } from "./reducer";
import { CorrelatedProduct, Product, UserCart } from "../models/admin";
import { convertFromCurrency, convertToCurrency } from "../utils/utils";
import { retry } from "rxjs";

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
        let lowerBoundPrice: number | undefined;
        let upperBoundPrice: number | undefined;

        switch (product.product.currency) {
          case "ZAR":
            lowerBoundPrice = convertFromCurrency(
              state.lowerPriceBound,
              state.currencyConversion?.["ZAR"].value
            );

            upperBoundPrice = convertFromCurrency(
              state.upperPriceBound,
              state.currencyConversion?.["ZAR"].value
            );
            break;
          case "USD":
            lowerBoundPrice = convertFromCurrency(
              state.lowerPriceBound,
              state.currencyConversion?.["USD"].value
            );

            upperBoundPrice = convertFromCurrency(
              state.upperPriceBound,
              state.currencyConversion?.["USD"].value
            );
            break;
          case "GBP":
            lowerBoundPrice = convertFromCurrency(
              state.lowerPriceBound,
              state.currencyConversion?.["GBP"].value
            );

            upperBoundPrice = convertFromCurrency(
              state.upperPriceBound,
              state.currencyConversion?.["GBP"].value
            );
            break;
          case "EUR":
            lowerBoundPrice = convertFromCurrency(
              state.lowerPriceBound,
              state.currencyConversion?.["EUR"].value
            );

            upperBoundPrice = convertFromCurrency(
              state.upperPriceBound,
              state.currencyConversion?.["EUR"].value
            );
            break;
          default:
        }

        if (product.product.currency === "ZAR") {
          lowerBoundPrice = convertFromCurrency(
            state.lowerPriceBound,
            state.currencyConversion?.["ZAR"].value
          );

          upperBoundPrice = convertFromCurrency(
            state.upperPriceBound,
            state.currencyConversion?.["ZAR"].value
          );
        } else if (product.product.currency === "USD") {
          lowerBoundPrice = convertFromCurrency(
            state.lowerPriceBound,
            state.currencyConversion?.["USD"].value
          );

          upperBoundPrice = convertFromCurrency(
            state.upperPriceBound,
            state.currencyConversion?.["USD"].value
          );
        } else if (product.product.currency === "GBP") {
          lowerBoundPrice = convertFromCurrency(
            state.lowerPriceBound,
            state.currencyConversion?.["GBP"].value
          );

          upperBoundPrice = convertFromCurrency(
            state.upperPriceBound,
            state.currencyConversion?.["GBP"].value
          );
        } else if (product.product.currency === "EUR") {
          lowerBoundPrice = convertFromCurrency(
            state.lowerPriceBound,
            state.currencyConversion?.["EUR"].value
          );

          upperBoundPrice = convertFromCurrency(
            state.upperPriceBound,
            state.currencyConversion?.["EUR"].value
          );
        }

        if (state.priceRangeType === "") {
          return true;
        } else if (
          state.priceRangeType === "Equals" &&
          lowerBoundPrice &&
          Math.round(product.product.price) === Math.round(lowerBoundPrice)
        ) {
          return true;
        } else if (
          state.priceRangeType === "Less Than" &&
          lowerBoundPrice &&
          product.product.price < lowerBoundPrice
        ) {
          return true;
        } else if (
          state.priceRangeType === "More Than" &&
          lowerBoundPrice &&
          product.product.price > lowerBoundPrice
        ) {
          return true;
        } else if (
          state.priceRangeType === "Between" &&
          lowerBoundPrice &&
          upperBoundPrice &&
          product.product.price > lowerBoundPrice &&
          product.product.price < upperBoundPrice
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

export const selectCartTotal = createSelector(
  previewSelectFeature,
  selectUserCartProducts,
  (state, cartProducts) => {
    let cartTotal = 0;
    for (const product of cartProducts) {
      if (product.currency === "EUR" && product.quantity > 0) {
        cartTotal += convertToCurrency(
          product.price,
          state.currencyConversion?.["EUR"].value
        );
      } else if (product.currency === "ZAR" && product.quantity > 0) {
        cartTotal += convertToCurrency(
          product.price,
          state.currencyConversion?.["ZAR"].value
        );
      } else if (product.currency === "GBP" && product.quantity > 0) {
        cartTotal += convertToCurrency(
          product.price,
          state.currencyConversion?.["GBP"].value
        );
      } else if (product.currency === "USD" && product.quantity > 0) {
        cartTotal += convertToCurrency(
          product.price,
          state.currencyConversion?.["USD"].value
        );
      }
    }
    return cartTotal;
  }
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

export const selectAllProductsLoading = createSelector(
  previewSelectFeature,
  (state) =>
    state.productsLoadingState ||
    state.categoriesLoadingState ||
    state.tagsLoadingState
);

export const selectCurrency = createSelector(
  previewSelectFeature,
  (state) => state.userCurrency
);

export const selectCurrencyConversion = createSelector(
  previewSelectFeature,
  (state) => state.currencyConversion
);
