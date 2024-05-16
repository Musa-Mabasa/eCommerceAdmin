import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState, dashboardFeatureKey } from "./reducer";
import { adminSelectFeature } from "../adminStore/selectors";
import { CorrelatedOrderItem } from "../models/admin";

export const dashboardSelectFeature =
  createFeatureSelector<DashboardState>(dashboardFeatureKey);

export const selectOrderItems = createSelector(
  dashboardSelectFeature,
  adminSelectFeature,
  (state, adminState): CorrelatedOrderItem[] | undefined => {
    console.log(state.orders);

    return state.orders.map((order): CorrelatedOrderItem => {
      const product = adminState.adminProducts.find(
        (products) => products.id === order.productId
      );

      console.log(product);

      if (product)
        return {
          orderItem: order,
          productName: product?.name,
          productPrice: product?.price,
          productCurrency: product?.currency,
        };
      else return {} as CorrelatedOrderItem;
    });
  }
);

export const selectRevenue = createSelector(
  dashboardSelectFeature,
  selectOrderItems,
  (state, items) => {
    let revenue = 0;
    if (items)
      for (const item of items) {
        revenue += item.productPrice;
      }
    return revenue;
  }
);

export const selectOrdersLoadingState = createSelector(
  dashboardSelectFeature,
  (state) => state.ordersLoadingState
);
