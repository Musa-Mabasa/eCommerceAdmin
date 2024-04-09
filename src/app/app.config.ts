import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getStorage, provideStorage } from "@angular/fire/storage";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: "ecommerce-admin-d6768",
          appId: "1:135946210063:web:f68662275757503d6ecc7a",
          storageBucket: "ecommerce-admin-d6768.appspot.com",
          apiKey: "AIzaSyDkfF6e5ZC4CWVcOpSeoJj6TED6952xecg",
          authDomain: "ecommerce-admin-d6768.firebaseapp.com",
          messagingSenderId: "135946210063",
          measurementId: "G-26SM36LJLC",
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
};
