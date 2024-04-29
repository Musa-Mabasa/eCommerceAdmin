import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matSegment,
  matAdminPanelSettings,
  matShoppingBag,
} from "@ng-icons/material-icons/baseline";
import { matNotificationsNoneOutline, matShoppingCartOutline } from "@ng-icons/material-icons/outline";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  viewProviders: [
    provideIcons({ matSegment, matAdminPanelSettings, matShoppingBag, matNotificationsNoneOutline, matShoppingCartOutline }),
  ],
})
export class HomeComponent {
  onPreview = false;
}
