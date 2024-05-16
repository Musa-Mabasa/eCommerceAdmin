import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideState, provideStore } from "@ngrx/store";
import { adminFeatureKey, adminReducer } from "./adminStore/reducer";
import { provideEffects } from "@ngrx/effects";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { en_US, provideNzI18n } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { FormsModule } from "@angular/forms";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient } from "@angular/common/http";
import { firebase } from "../../environment/environment";
import { AdminEffects } from "./adminStore/effects";
import { PreviewEffects } from "./previewStore/effects";
import { previewFeatureKey, previewReducer } from "./previewStore/reducer";
import {
  dashboardFeatureKey,
  dashboardReducer,
} from "./dashboardStore/reducer";
import { DashboardEffects } from "./dashboardStore/effects";

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: adminFeatureKey, reducer: adminReducer }),
    provideState({ name: previewFeatureKey, reducer: previewReducer }),
    provideState({ name: dashboardFeatureKey, reducer: dashboardReducer }),
    provideEffects(AdminEffects, PreviewEffects, DashboardEffects),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebase))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAnimationsAsync("noop"),
  ],
};
