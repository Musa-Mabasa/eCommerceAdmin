import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState, dashboardFeatureKey } from "./reducer";
import { adminSelectFeature } from "../adminStore/selectors";
import { CorrelatedOrderItem, Product } from "../models/admin";

export const dashboardSelectFeature =
  createFeatureSelector<DashboardState>(dashboardFeatureKey);

export const selectOrderItems = createSelector(
  dashboardSelectFeature,
  adminSelectFeature,
  (state, adminState): CorrelatedOrderItem[] | undefined => {
    return state.orders.map((order): CorrelatedOrderItem => {
      const product = adminState.adminProducts.find(
        (products) => products.id === order.productId
      );

      if (product)
        return {
          orderItem: order,
          productName: product?.name,
          productPrice: product?.price,
          productCurrency: product?.currency,
          productQuantity: product.quantity,
        };
      else return {} as CorrelatedOrderItem;
    });
  }
);

export const selectProductsSold = createSelector(
  selectOrderItems,
  (items) => items?.length ?? 0
);

export const selectRevenue = createSelector(selectOrderItems, (items) => {
  let revenue = 0;
  if (items)
    for (const item of items) {
      revenue += item.productPrice;
    }
  return revenue;
});

export const selectTotalCustomers = createSelector(
  selectOrderItems,
  (items) =>
    items
      ?.map((item) => item.orderItem.customerName)
      .filter(
        (name, index, currentValue) => currentValue.indexOf(name) === index
      ).length
);

export const selectTotalQuantity = createSelector(
  adminSelectFeature,
  selectOrderItems,
  (adminState, items) => {
    let totalQuantity = 0;
    for (const product of adminState.adminProducts) {
      totalQuantity += product.quantity;
    }
    let productsSold = 0;
    if (items)
      for (const item of items) {
        productsSold++;
      }

    return totalQuantity - productsSold;
  }
);

export const selectStockReport = createSelector(
  adminSelectFeature,
  selectOrderItems,
  (adminState, items): { product: Product; remaining: number | undefined }[] =>
    adminState.adminProducts.map((prod) => {
      if (!items) return { product: prod, remaining: 100 };

      const itemsOrdered = items?.filter(
        (item) => item.orderItem.productId === prod.id
      ).length;

      if (itemsOrdered > 0) {
        const remaining =
          ((prod.quantity - itemsOrdered) / prod.quantity) * 100;

        return { product: prod, remaining };
      }

      return { product: prod, remaining: 100 };
    })
);

export const selectTopProducts = createSelector(
  adminSelectFeature,
  selectOrderItems,
  (adminState, items) =>
    adminState.adminProducts
      .map((prod) => ({
        product: prod,
        sold:
          items?.filter((item) => item.orderItem.productId === prod.id)
            .length ?? 0,
      }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 6)
);

export const selectLastSevenDays = createSelector(() => {
  const today = new Date();
  const lastSevenDays: string[] = ["Today"];
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  for (let i = 1; i < 7; i++) {
    let now = new Date(today);
    const date = new Date(now.setDate(now.getDate() - i));
    const day = days[date.getDay()];
    lastSevenDays.push(day);
  }

  return lastSevenDays.reverse();
});

export const selectLastSevenDaysSales = createSelector(
  selectOrderItems,
  (items) => {
    const today = new Date();
    const lastSevenDays: Date[] = [];

    for (let i = 0; i < 7; i++) {
      let now = new Date(today);
      lastSevenDays.push(new Date(now.setDate(now.getDate() - i)));
    }

    return lastSevenDays.reverse().map(
      (day) =>
        items?.filter((item) => {
          const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          });
          const formattedDate = dateTimeFormatter.format(day);

          return item.orderItem.date == formattedDate;
        }).length ?? 0
    );
  }
);

export const selectOrdersLoadingState = createSelector(
  dashboardSelectFeature,
  (state) => state.ordersLoadingState
);
