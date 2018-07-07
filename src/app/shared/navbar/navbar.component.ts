import { Component } from "@angular/core";
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: "app-navbar",
  templateUrl: "navbar.component.html",
  styleUrls: ["navbar.component.scss"]
})
export class NavbarComponent {
  constructor() {}
  ngOnInit() {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems);
  }
}
