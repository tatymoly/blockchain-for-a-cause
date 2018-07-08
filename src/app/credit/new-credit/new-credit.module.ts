import { NgModule } from "@angular/core";
import { NewCreditComponent } from "./new-credit.component";
import { NewCreditRoutingModule } from "./new-credit-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@NgModule({
  imports: [
    NewCreditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [NewCreditComponent],
  exports: [NewCreditComponent],
  providers: [HttpClient]
})
export class NewCreditModule {}
