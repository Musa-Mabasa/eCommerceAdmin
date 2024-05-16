import { Injectable, inject } from "@angular/core";
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from "@angular/fire/firestore";
import { getCookie } from "../utils/utils";
import { Observable } from "rxjs";
import { OrderItem } from "../models/admin";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  firestore = inject(Firestore);

  getOrders() {
    const fetchQuery = query(
      collection(this.firestore, "OrderItem"),
      where("adminId", "==", getCookie("userId"))
    );

    return collectionData(fetchQuery, { idField: "id" }) as Observable<
      OrderItem[]
    >;
  }
}
