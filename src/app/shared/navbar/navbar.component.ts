import { Component } from "@angular/core";
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: "app-navbar",
  templateUrl: "navbar.component.html",
  styleUrls: ["navbar.component.scss"]
})
export class NavbarComponent {
  userLogged = false;

  constructor() {}
  ngOnInit() {
    this.userLog();
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems);
  }
  userLog() {
    let userEmail = sessionStorage.getItem(
      "firebase:authUser:AIzaSyBaouoGxFOxBbi9grWc9hhvjhzDoqEExdg:[DEFAULT]"
    );
    if (userEmail != null) {
      this.userLogged = true;
    }
  }
}
