import { Component, OnInit, NgZone } from "@angular/core";
import { Web3Service } from "../services/web3.service";
// import { Web3Service } from "../util/web3.service";
import { AngelTokenService } from "../services/angel-token.service";
// import { AngelHackService } from '../services/angel-hack.service';

// declare let require: any;
// const angeltoken_artifacts = require("../../../build/contracts/AngelToken.json");

@Component({
  selector: "app-loan",
  templateUrl: "loan.component.html",
  styleUrls: ["loan.component.scss"]
})
export class LoanComponent implements OnInit {
  accounts: string[];
  account: string;
  // AngelToken: any;
  balance = 0;

  model = {
    amount: 5,
    receiver: "",
    balance: 0,
    account: ""
  };

  // status = '';

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private angelTokenService: AngelTokenService,
    // private angelHackService: AngelHackService
  ) {
      console.log("Constructor: " + web3Service);
      setInterval(() => this.refreshAccount(), 100);
      // this.angelHackService.trasferOwnership().subscribe(
      //   result => {
      //     console.log(result);
      //   },
      //   error => {
      //     console.log(error);

      //   }
      // );
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
  ngOnInit(): void {
    // setInterval(() => this.refreshBalance(), 100);
    console.log("OnInit: " + this.web3Service);
    // this.getBalance("0xf0d9828044fd544007b73b54c68a0b6c6edbb01a");
    // this.watchAccount();
    // this.web3Service.artifactsToContract(angeltoken_artifacts)
    //     .then((AngelTokenAbstraction) => {
    //         this.AngelToken = AngelTokenAbstraction;
    //     });
  }
  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.refreshBalance();
    });
  }
  setStatus(status) {
    // this.matSnackBar.open(status, null, { duration: 3000 });
    console.log("status");
  }

  sendCoin() {
    const amount = this.model.amount;
    const receiver = this.model.receiver;

    console.log("Sending coins" + amount + " to " + receiver);

    this.setStatus("Initiating transaction... (please wait)");
    this.angelTokenService.sendCoin(this.account, receiver, amount).subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.c[0]);
        this.refreshBalance();
      },
      error => {
        this.refreshBalance();
        console.log(error);
      }
    );
  }

  refreshBalance() {
    this._ngZone.run(() =>
      this.angelTokenService.getBalance(this.account).subscribe(
        (response: any) => {
          this.balance = response.c[0];
        },
        error => {
          // console.log(error);
        }
      )
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

  setAmount(e) {
    console.log("Setting amount: " + e.target.value);
    this.model.amount = e.target.value;
  }

  setReceiver(e) {
    console.log("Setting receiver: " + e.target.value);
    this.model.receiver = e.target.value;
  }
}
