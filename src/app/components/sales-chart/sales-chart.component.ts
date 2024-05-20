import { Component, OnInit, inject } from "@angular/core";
import Chart from "chart.js/auto";
import { DashboardState } from "../../dashboardStore/reducer";
import { Store } from "@ngrx/store";
import {
  selectLastSevenDays,
  selectLastSevenDaysSales,
  selectProductsSold,
} from "../../dashboardStore/selectors";
import { AsyncPipe } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-sales-chart",
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: "./sales-chart.component.html",
  styleUrl: "./sales-chart.component.scss",
})
export class SalesChartComponent implements OnInit {
  chart?: Chart;
  store = inject(Store<DashboardState>);
  sevenDays$ = this.store.select(selectLastSevenDays);
  sevenDaysSales$ = this.store.select(selectLastSevenDaysSales);
  productsSold$ = this.store.select(selectProductsSold);
  sevenDays: string[] = [];
  sevenDaysSales: number[] = [];
  productsSold: number[] = [];

  constructor() {
    this.sevenDays$
      .pipe(takeUntilDestroyed())
      .subscribe((days) => (this.sevenDays = days));

    this.sevenDaysSales$.pipe(takeUntilDestroyed()).subscribe((sales) => {
      this.sevenDaysSales = sales;
    });

    this.productsSold$.pipe(takeUntilDestroyed()).subscribe((sold) => {
      this.productsSold = [];

      for (let i = 0; i < 7; i++) this.productsSold.push(sold);
    });
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: "bar", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.sevenDays,
        datasets: [
          {
            data: this.sevenDaysSales,
            backgroundColor: "#01bbab",
            borderRadius: 5,
          },
          {
            data: this.productsSold,
            backgroundColor: "lightgrey",
            borderRadius: 5,
            animation: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            stacked: true,
          },
          y: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Sales",
            position: "top",
            font: {
              weight: 500,
              size: 20,
              family: "rubik",
              style: "normal",
            },
          },
        },
      },
    });
  }
}
