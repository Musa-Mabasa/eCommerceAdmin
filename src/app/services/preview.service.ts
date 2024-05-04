import { Injectable, inject } from "@angular/core";
import {
  Firestore,
  collection,
  collectionData,
  query,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Category, Product, Tag } from "../models/admin";

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
}
