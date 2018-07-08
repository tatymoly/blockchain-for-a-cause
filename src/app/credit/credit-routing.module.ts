import { NgModule } from "@angular/core";
import { CreditComponent } from "./credit.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "", component: CreditComponent, pathMatch: "full" }
    ])
  ],
  exports: [RouterModule]
})
export class CreditRoutingModule {}
