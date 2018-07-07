import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanComponent } from './loan.component'
import { LoanRoutingModule } from './loan-routing.module'
import { UtilModule } from '../util/util.module';
// import {RouterModule} from '@angular/router';
// import {MetaSenderComponent} from './meta-sender/meta-sender.component';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    LoanRoutingModule,
    CommonModule,
    UtilModule
  ],
  declarations: [LoanComponent],
  exports: [LoanComponent]
})
export class LoanModule {}
