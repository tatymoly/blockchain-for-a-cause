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
      },
      {
        path: "loans",
        loadChildren: "./loan/loan.module#LoanModule"
      },
      {
        path: "mis-creditos",
        loadChildren: "./credit/credit.module#CreditModule"
      },
      {
        path: "solicitar-credito",
        loadChildren: "./credit/new-credit/new-credit.module#NewCreditModule"
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
