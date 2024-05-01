import { Injectable, inject } from "@angular/core";
import { EMPTY, Observable, from, throwError } from "rxjs";
import { Cart, Product, Tag } from "../models/admin";
import { Firestore, collection, doc, setDoc } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  firestore = inject(Firestore);
  //These are placeholder functions and will be implemented later.
  getAdminProducts(adminId: string): Observable<Product[]> {
    return from(EMPTY);
  }

  getAllStoreProducts(): Observable<Product[]> {
    return from(EMPTY);
  }

  getAllTags(): Observable<Tag[]> {
    return from(EMPTY);
  }

  getAdminCart(adminId: string): Observable<Cart> {
    return from(EMPTY);
  }

  addProduct(product: Product): Observable<void | Error> {
    return from(
      setDoc(doc(collection(this.firestore, "Product")), { product }).catch(
        () => Error("Failed to add product")
      )
    );
  }
}
