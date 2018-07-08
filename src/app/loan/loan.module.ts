import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanComponent } from './loan.component'
import { LoanRoutingModule } from './loan-routing.module'
import { UtilModule } from "../util/util.module";
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [LoanRoutingModule, CommonModule, UtilModule, ServicesModule],
  declarations: [LoanComponent],
  exports: [LoanComponent]
})
export class LoanModule {}
