import { Injectable, inject } from "@angular/core";
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  query,
  where,
} from "@angular/fire/firestore";
import { Observable, from } from "rxjs";
import { Cart, Category, Product, Tag } from "../models/admin";
import { user } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class PreviewService {
  firestore = inject(Firestore);

  getAllProducts() {
    const fetchQuery = query(collection(this.firestore, "Product"));

    return collectionData(fetchQuery, { idField: "id" }) as Observable<
      Product[]
    >;
  }

  getCategories() {
    const fetchQuery = query(collection(this.firestore, "Category"));

    return collectionData(fetchQuery) as Observable<Category[]>;
  }

  getTags() {
    const fetchQuery = query(collection(this.firestore, "Tag"));

    return collectionData(fetchQuery) as Observable<Tag[]>;
  }

  getCart(userId: string) {
    const fetchQuery = query(
      collection(this.firestore, "Cart"),
      where("userId", "==", userId)
    );

    return collectionData(fetchQuery, { idField: "id" }) as Observable<Cart[]>;
  }
}
