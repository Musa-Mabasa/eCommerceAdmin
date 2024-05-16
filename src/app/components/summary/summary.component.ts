import { Component, Input } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matArrowDropUp,
  matArrowOutward,
} from "@ng-icons/material-icons/baseline";
import { CountUpDirective } from "../../directives/count-up.directive";

@Component({
  selector: "app-summary",
  standalone: true,
  imports: [NgIconComponent, CountUpDirective],
  templateUrl: "./summary.component.html",
  styleUrl: "./summary.component.scss",
  viewProviders: [provideIcons({ matArrowOutward, matArrowDropUp })],
})
export class SummaryComponent {
  @Input() title?: string;
  @Input() count?: number;
}
