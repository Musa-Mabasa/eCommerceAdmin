import { Injectable, inject } from "@angular/core";
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import { Observable, from } from "rxjs";
import {
  Cart,
  Category,
  CorrelatedProduct,
  Product,
  Tag,
  UserCart,
} from "../models/admin";
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

  getUserCarts(cartId: string) {
    const fetchQuery = query(
      collection(this.firestore, "UserCart"),
      where("cartId", "==", cartId)
    );

    return collectionData(fetchQuery, { idField: "id" }) as Observable<
      UserCart[]
    >;
  }

  addProductToCart(cartId: string, product: CorrelatedProduct) {
    return from(
      setDoc(doc(collection(this.firestore, "UserCart")), {
        cartId,
        productId: product.product.id,
      }).catch((err) => Error(err.message))
    );
  }

  deleteProductFromCart(cartId: string, productId: string) {
    const fetchQuery = query(
      collection(this.firestore, "UserCart"),
      where("cartId", "==", cartId),
      where("productId", "==", productId)
    );

    return from(
      getDocs(fetchQuery).then((docs) =>
        docs.forEach((doc) => deleteDoc(doc.ref))
      )
    );
  }
}
