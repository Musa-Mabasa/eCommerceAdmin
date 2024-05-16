import { isDevMode } from "@angular/core";
import { createReducer, MetaReducer, on } from "@ngrx/store";
import { OrderItem } from "../models/admin";
import { getOrders, getOrdersComplete } from "./actions";

export const dashboardFeatureKey = "dashboard";

export interface DashboardState {
  orders: OrderItem[];
  ordersLoadingState: boolean;
}

const initialState: DashboardState = {
  orders: [],
  ordersLoadingState: false,
};

export const dashboardReducer = createReducer(
  initialState,
  on(getOrders, (state) => ({
    ...state,
    ordersLoadingState: true,
  })),
  on(getOrdersComplete, (state, { orders }) => ({
    ...state,
    ordersLoadingState: false,
    orders,
  }))
);

export const metaReducers: MetaReducer<DashboardState>[] = isDevMode()
  ? []
  : [];
