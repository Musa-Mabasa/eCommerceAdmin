import { Component, OnInit } from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: "app-sales-chart",
  standalone: true,
  imports: [],
  templateUrl: "./sales-chart.component.html",
  styleUrl: "./sales-chart.component.scss",
})
export class SalesChartComponent implements OnInit {
  chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: "bar", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ["Tue", "Wed", "Thurs", "Fri", "Sat", "Sun", "Mon"],
        datasets: [
          {
            data: ["467", "576", "572", "79", "92", "574", "573", "576"],
            backgroundColor: "#01bbab",
            borderRadius: 5,
          },
          {
            data: [
              "1000",
              "1000",
              "1000",
              "1000",
              "1000",
              "1000",
              "1000",
              "1000",
            ],
            backgroundColor: "lightgrey",
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
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
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Sales",
            position: "top",
          },
        },
      },
    });
  }
}
