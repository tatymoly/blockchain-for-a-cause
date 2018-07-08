import { NgModule } from "@angular/core";
import { LoanComponent } from "./loan.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "", component: LoanComponent, pathMatch: "full" }
    ])
  ],
  exports: [RouterModule]
})
export class LoanRoutingModule {}
