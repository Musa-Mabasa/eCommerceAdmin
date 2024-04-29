import { Component, EventEmitter, Output } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matShoppingCartOutline } from "@ng-icons/material-icons/outline";

@Component({
  selector: "app-preview-card",
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: "./preview-card.component.html",
  styleUrl: "./preview-card.component.scss",
  viewProviders: [
    provideIcons({
      matShoppingCartOutline,
    }),
  ]
})
export class PreviewCardComponent {
  @Output() onClick: EventEmitter<string> = new EventEmitter();
  productId = "dsgtyfdsvgvsd";
}
