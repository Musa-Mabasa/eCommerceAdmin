import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matSegment,
  matAdminPanelSettings,
  matShoppingBag,
  matSettings,
  matExitToApp,
} from "@ng-icons/material-icons/baseline";
import { getCookie } from "../../utils/utils";
import { NgIf } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { matNotificationsNoneOutline, matShoppingCartOutline } from "@ng-icons/material-icons/outline";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive, RouterOutlet, NgIf],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  viewProviders: [
    provideIcons({
      matSegment,
      matAdminPanelSettings,
      matShoppingBag,
      matSettings,
      matExitToApp, 
      matNotificationsNoneOutline, 
      matShoppingCartOutline
    }),
  ],
})
export class HomeComponent {
  avatar: string | undefined = getCookie("avatar");
  displayName: string | undefined = getCookie("displayName");
  email = getCookie("email");
  authService = inject(AuthService);

  signOut() {
    this.authService.signOut();
  }
}
