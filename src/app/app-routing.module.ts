import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: "",
        loadChildren: "./auth//login/login.module#LoginModule"
      },
      {
        path: "mi-cuenta",
        loadChildren: "./dashboard/dashboard.module#DashboardModule"
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
