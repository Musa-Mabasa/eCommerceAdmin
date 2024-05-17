import { Component, Input } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matArrowDropDown,
  matArrowDropUp,
  matArrowOutward,
} from "@ng-icons/material-icons/baseline";
import { CountUpDirective } from "../../directives/count-up.directive";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-summary",
  standalone: true,
  imports: [NgIconComponent, CountUpDirective, NgIf],
  templateUrl: "./summary.component.html",
  styleUrl: "./summary.component.scss",
  viewProviders: [
    provideIcons({ matArrowOutward, matArrowDropUp, matArrowDropDown }),
  ],
})
export class SummaryComponent {
  @Input() title?: string;
  @Input() count?: number;
  @Input() increase?: number;
  @Input() decrease?: number;
}
