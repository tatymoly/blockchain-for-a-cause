import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "", component: LoginComponent, pathMatch: "full" }
    ])
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
