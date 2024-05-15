import { Component, Input } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "app-stock-item",
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: "./stock-item.component.html",
  styleUrl: "./stock-item.component.scss",
})
export class StockItemComponent {
  @Input() productName?: string;
  @Input() quantity?: number;
  @Input() remaining?: number;
}
