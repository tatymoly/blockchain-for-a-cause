import { Component, ViewChild, ElementRef, NgZone, OnInit } from "@angular/core";
import { Web3Service } from "../services/web3.service";
import { AngelTokenService } from "../services/angel-token.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  accounts: string[];
  account: string;
  balance = 0;
  monedaLocal = 0;
  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private angelTokenService: AngelTokenService
  ) {
    console.log("Constructor: " + web3Service);
    this.refreshAccount();
    // setInterval(() => this.refreshAccount(), 100);
  }
  ngOnInit() {
    this.refreshAccount();
  }
  refreshAccount() {
    this.web3Service.getAccounts().subscribe(
      accs => {
        this.accounts = accs;
        // console.log(this.accounts);
        this.account = this.accounts[0];
        // console.log(this.account);
        this.refreshBalance();
      },
      err => alert(err)
    );
  }
  getBalance(account: any) {
    this.angelTokenService.getBalance(account).subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.c[0]);
      },
      error => {
        console.log(error);
      }
    );
  }
  refreshBalance() {
    this._ngZone.run(() =>
      this.angelTokenService.getBalance(this.account).subscribe(
        (response: any) => {
          this.balance = response.c[0]/100;
          this.monedaLocal = this.balance * 500;
        },
        error => {
          // console.log(error);
        }
      )
    );
  }
}
