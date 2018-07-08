import { NgModule } from "@angular/core";
import { NewCreditComponent } from "./new-credit.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "", component: NewCreditComponent, pathMatch: "full" }
    ])
  ],
  exports: [RouterModule]
})
export class NewCreditRoutingModule {}
