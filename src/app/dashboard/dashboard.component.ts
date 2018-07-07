import { Component, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as M from "materialize-css/dist/js/materialize";
import * as Chart from "chart.js";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.scss"]
})
export class DashboardComponent implements AfterViewInit {
  canvas: any;
  ctx: any;

  constructor() {}

  ngAfterViewInit() {
    this.canvas = document.getElementById("myChart");
    this.ctx = this.canvas.getContext("2d");
    let myChart = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: ["New", "In Progress", "On Hold"],
        datasets: [
          {
            label: "# of Votes",
            data: [1, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1
          }
        ]
      }
    });
  }
}
