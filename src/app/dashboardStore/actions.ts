import { createAction, props } from "@ngrx/store";
import { OrderItem } from "../models/admin";

export const getOrders = createAction(
    "[DASHBOARD] GetOrders",
)

export const getOrdersComplete = createAction(
    "[DASHBOARD] GetOrdersComplete",
    props<{orders: OrderItem[]}>()
)