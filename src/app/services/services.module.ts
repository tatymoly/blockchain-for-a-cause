import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3Service } from './web3.service';
import { AngelTokenService } from "./angel-token.service";
import { AngelHackService } from './angel-hack.service';

@NgModule({
  imports: [CommonModule],
  providers: [Web3Service, AngelTokenService, AngelHackService],
  declarations: []
})
export class ServicesModule {}
