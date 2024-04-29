import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-preview-card",
  standalone: true,
  imports: [],
  templateUrl: "./preview-card.component.html",
  styleUrl: "./preview-card.component.scss",
})
export class PreviewCardComponent {
  @Output() onClick: EventEmitter<string> = new EventEmitter();
  productId = "dsgtyfdsvgvsd";
}
