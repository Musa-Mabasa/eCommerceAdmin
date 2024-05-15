import { Component, Input } from "@angular/core";

@Component({
  selector: "app-stock-item",
  standalone: true,
  imports: [],
  templateUrl: "./stock-item.component.html",
  styleUrl: "./stock-item.component.scss",
})
export class StockItemComponent {
  @Input() productName?: string;
  @Input() quantity?: number;
  @Input() remaining?: number;
}
