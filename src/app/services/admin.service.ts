import { Injectable } from "@angular/core";
import { EMPTY, Observable, from } from "rxjs";
import { Cart, Product } from "../models/admin";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  getAdminProducts(adminId: string): Observable<Product[]> {
    return from(EMPTY);
  }

  getAllStoreProducts(): Observable<Product[]> {
    return from(EMPTY);
  }

  getAdminCart(adminId: string): Observable<Cart> {
    return from(EMPTY);
  }
}
