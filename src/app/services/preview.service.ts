import { Injectable, inject } from "@angular/core";
import {
  Firestore,
  collection,
  collectionData,
  query,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Product } from "../models/admin";

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
}
