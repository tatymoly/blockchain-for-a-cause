import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as M from "materialize-css/dist/js/materialize";
// import * as Chart from "chart.js";
import { Chart } from "chart.js";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  canvas: any;
  ctx: any;
  myChart;
  @ViewChild("myChart") myCanvas: ElementRef;
  constructor() {}

  ngOnInit() {
    this.buildChart();
  }

  buildChart() {
    let ctx = this.myCanvas.nativeElement.getContext("2d");
    this.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "Bar Dataset",
            data: [10, 20, 30, 40]
          },
          {
            label: "Line Dataset",
            data: [50, 50, 50, 50],

            // Changes this dataset to become a line
            type: "line"
          }
        ],
        labels: ["January", "February", "March", "April"]
      }
    });
  }
}
