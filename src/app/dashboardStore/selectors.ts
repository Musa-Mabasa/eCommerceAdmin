import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState, dashboardFeatureKey } from "./reducer";
import { adminSelectFeature } from "../adminStore/selectors";
import { CorrelatedOrderItem, Product } from "../models/admin";
import { previewSelectFeature } from "../previewStore/selectors";
import { convertToCurrency } from "../utils/utils";
import { or } from "@angular/fire/firestore";

export const dashboardSelectFeature =
  createFeatureSelector<DashboardState>(dashboardFeatureKey);

export const selectOrderItems = createSelector(
  dashboardSelectFeature,
  adminSelectFeature,
  (state, adminState): CorrelatedOrderItem[] | undefined => {
    return state.orders
      .map((order): CorrelatedOrderItem => {
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
      })
      .sort((a, b) => {
        return (
          new Date(b.orderItem.date).getDate() -
          new Date(a.orderItem.date).getDate()
        );
      });
  }
);

export const selectProductsSold = createSelector(
  selectOrderItems,
  (items) => items?.length ?? 0
);

export const selectProductsSoldIncrease = createSelector(
  selectOrderItems,
  selectProductsSold,
  (items, sold) => {
    const today = new Date();
    const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    });
    const formattedDate = dateTimeFormatter.format(today);
    const todaysOrdersCount =
      items?.filter((item) => item.orderItem.date == formattedDate).length ?? 0;
    const previousCount = sold - todaysOrdersCount;
    if (previousCount === 0) return 0;

    return Math.floor(((sold - previousCount) / previousCount) * 100);
  }
);

export const selectRevenue = createSelector(
  selectOrderItems,
  previewSelectFeature,
  (items, previewState) => {
    let revenue = 0;
    if (items)
      for (const item of items) {
        if (item.productCurrency === "EUR" && item.productQuantity > 0) {
          revenue += convertToCurrency(
            item.productPrice,
            previewState.currencyConversion?.["EUR"].value
          );
        } else if (item.productCurrency === "ZAR" && item.productQuantity > 0) {
          revenue += convertToCurrency(
            item.productPrice,
            previewState.currencyConversion?.["ZAR"].value
          );
        } else if (item.productCurrency === "GBP" && item.productQuantity > 0) {
          revenue += convertToCurrency(
            item.productPrice,
            previewState.currencyConversion?.["GBP"].value
          );
        } else if (item.productCurrency === "USD" && item.productQuantity > 0) {
          revenue += convertToCurrency(
            item.productPrice,
            previewState.currencyConversion?.["USD"].value
          );
        }
      }
    return Number(revenue.toFixed(2));
  }
);

export const selectRevenueIncrease = createSelector(
  selectOrderItems,
  selectRevenue,
  previewSelectFeature,
  (items, revenue, previewState) => {
    const today = new Date();
    const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    });
    const formattedDate = dateTimeFormatter.format(today);
    const yesterdaysOrders = items?.filter(
      (item) => item.orderItem.date != formattedDate
    );

    let initialRevenue = 0;
    if (yesterdaysOrders)
      for (const order of yesterdaysOrders) {
        if (order.productCurrency === "EUR" && order.productQuantity > 0) {
          initialRevenue += convertToCurrency(
            order.productPrice,
            previewState.currencyConversion?.["EUR"].value
          );
        } else if (
          order.productCurrency === "ZAR" &&
          order.productQuantity > 0
        ) {
          initialRevenue += convertToCurrency(
            order.productPrice,
            previewState.currencyConversion?.["ZAR"].value
          );
        } else if (
          order.productCurrency === "GBP" &&
          order.productQuantity > 0
        ) {
          initialRevenue += convertToCurrency(
            order.productPrice,
            previewState.currencyConversion?.["GBP"].value
          );
        } else if (
          order.productCurrency === "USD" &&
          order.productQuantity > 0
        ) {
          initialRevenue += convertToCurrency(
            order.productPrice,
            previewState.currencyConversion?.["USD"].value
          );
        }
      }

    if (initialRevenue === 0) return 0;

    return Math.floor(((revenue - initialRevenue) / initialRevenue) * 100);
  }
);

export const selectTotalCustomers = createSelector(
  selectOrderItems,
  (items) =>
    items
      ?.map((item) => item.orderItem.customerName)
      .filter(
        (name, index, currentValue) => currentValue.indexOf(name) === index
      ).length ?? 0
);

export const selectTotalCustomersIncrease = createSelector(
  selectOrderItems,
  selectTotalCustomers,
  (items, customers) => {
    const today = new Date();
    const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    });
    const formattedDate = dateTimeFormatter.format(today);

    const yesterdaysCustomers = items
      ?.filter((item) => item.orderItem.date != formattedDate)
      .map((item) => item.orderItem.customerName)
      .filter(
        (name, index, currentValue) => currentValue.indexOf(name) === index
      );

    if (!yesterdaysCustomers?.length) return 0;
    return Math.floor(
      ((customers - yesterdaysCustomers?.length) /
        yesterdaysCustomers?.length) *
        100
    );
  }
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

export const selectTotalQuantityDecrease = createSelector(
  selectTotalQuantity,
  selectOrderItems,
  (quantity, items) => {
    if (!items?.length) return 0;

    const today = new Date();
    const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    });
    const formattedDate = dateTimeFormatter.format(today);

    const todaysOrders =
      items?.filter((item) => item.orderItem.date == formattedDate).length ?? 0;

    const yesterdaysOrders = quantity + todaysOrders;

    if (yesterdaysOrders === 0) return 0;

    return Math.floor(((yesterdaysOrders - quantity) / yesterdaysOrders) * 100);
  }
);

export const selectStockReport = createSelector(
  adminSelectFeature,
  selectOrderItems,
  (
    adminState,
    items
  ): {
    product: Product;
    remaining: number | undefined;
    remainingPercentage: number;
  }[] =>
    adminState.adminProducts.map((prod) => {
      if (prod.quantity === 0)
        return { product: prod, remaining: 0, remainingPercentage: 0 };

      if (!items)
        return {
          product: prod,
          remaining: prod.quantity,
          remainingPercentage: 100,
        };

      const itemsOrdered = items?.filter(
        (item) => item.orderItem.productId === prod.id
      ).length;

      if (itemsOrdered > 0) {
        const remainingPercentage =
          ((prod.quantity - itemsOrdered) / prod.quantity) * 100;

        return {
          product: prod,
          remaining: prod.quantity - itemsOrdered,
          remainingPercentage,
        };
      }

      return {
        product: prod,
        remaining: prod.quantity,
        remainingPercentage: 100,
      };
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

export const selectDashboardLoadingState = createSelector(
  dashboardSelectFeature,
  adminSelectFeature,
  (state, adminState) =>
    state.ordersLoadingState || adminState.productLoadingState
);
