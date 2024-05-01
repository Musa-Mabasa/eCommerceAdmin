import { Injectable, inject } from "@angular/core";
import { EMPTY, Observable, from, throwError } from "rxjs";
import { Cart, Product, Tag } from "../models/admin";
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from "@angular/fire/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@angular/fire/storage";
import { getCookie } from "../utils/utils";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  firestore = inject(Firestore);
  //These are placeholder functions and will be implemented later.
  getAdminProducts(adminId: string): Observable<Product[]> {
    console.log("phakathi inside");
    console.log(adminId);

    const fetchQuery = query(
      collection(this.firestore, "Product"),
      where("adminId", "==", adminId)
    );

    return collectionData(fetchQuery) as Observable<Product[]>;
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

  addProduct(productWithFile: {
    product: Product;
    file?: File;
  }): Observable<void | Error> {
    if (productWithFile.file) {
      const storage = getStorage();
      const imageRef = ref(storage, productWithFile.file.name);
      const blob = productWithFile.file as Blob;

      return from(
        uploadBytes(imageRef, blob).then((snapshot) =>
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);

            const finalProduct = {
              ...productWithFile.product,
              imageUrl: downloadURL,
            };
            return setDoc(doc(collection(this.firestore, "Product")), {
              adminId: finalProduct.adminId,
              name: finalProduct.name,
              description: finalProduct.description,
              price: finalProduct.price,
              currency: finalProduct.currency,
              category: finalProduct.category,
              quantity: finalProduct.quantity,
              imageUrl: finalProduct.imageUrl,
            }).catch((err) => Error(err.message));
          })
        )
      );
    } else {
      const finalProduct = productWithFile.product;
      return from(
        setDoc(doc(collection(this.firestore, "Product")), {
          adminId: finalProduct.adminId,
          name: finalProduct.name,
          description: finalProduct.description,
          price: finalProduct.price,
          currency: finalProduct.currency,
          category: finalProduct.category,
          quantity: finalProduct.quantity,
        }).catch((err) => Error(err.message))
      );
    }
  }
}
