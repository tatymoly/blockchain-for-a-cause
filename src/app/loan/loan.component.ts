import { Component, OnInit, NgZone } from "@angular/core";
import { Web3Service } from "../services/web3.service";
// import { Web3Service } from "../util/web3.service";
import { AngelTokenService } from '../services/angel-token.service';

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
    private angelTokenService: AngelTokenService
  ) {
    console.log("Constructor: " + web3Service);
    this.web3Service.getAccounts().subscribe(
      accs => {
        this.accounts = accs;
        this.account = this.accounts[0];
          console.log(this.account);
        
        this._ngZone.run(() => this.angelTokenService.getBalance(this.account).subscribe(
            (response: any) => {
                console.log(response);
                console.log(response.c[0]);
                this.balance = response.c[0];
            },
            error => {
                console.log(error);
                
            }
        ));
      },
      err => alert(err)
    );
  }

  ngOnInit(): void {
    console.log("OnInit: " + this.web3Service);
    // this.watchAccount();
    // this.web3Service.artifactsToContract(angeltoken_artifacts)
    //     .then((AngelTokenAbstraction) => {
    //         this.AngelToken = AngelTokenAbstraction;
    //     });
  }

  watchAccount() {
    // this.web3Service.accountsObservable.subscribe((accounts) => {
    //     this.accounts = accounts;
    //     this.model.account = accounts[0];
    //     this.refreshBalance();
    // });
  }

  setStatus(status) {
    // this.matSnackBar.open(status, null, { duration: 3000 });
    console.log("status");
  }

  async sendCoin() {
    // sendCoin() {
    if (true) {
      this.setStatus("AngelToken is not loaded, unable to send transaction");
      return;
    }

    const amount = this.model.amount;
    const receiver = this.model.receiver;

    console.log("Sending coins" + amount + " to " + receiver);

    this.setStatus("Initiating transaction... (please wait)");
    try {
      console.log("recivier", receiver);
      console.log("account", this.model.account);
      console.log(this.web3Service.web3.toWei(amount, "ether"));
    //   const deployedAngelToken = await this.AngelToken.deployed();
    //   const transaction = await deployedAngelToken.transfer(receiver, amount, {
    //     from: this.model.account,
    //     gas: 100000
    //   });
    //   console.log(transaction);
      // .then(result => {
      //   console.log("result");
      //   console.log(result);
      // });
      // this.web3Service.web3.toWei(1.5, 'ether'),
      // console.log(transaction);
      //   "0xb1d28E599359545060F29eE73DeecE5ec69f03A4"

    //   if (!transaction) {
    //     this.setStatus("Transaction failed!");
    //   } else {
    //     this.setStatus("Transaction complete!");
    //   }
    } catch (e) {
      console.log(e);
      this.setStatus("Error sending coin; see log.");
    }
  }

    refreshBalance() {
        //   this.angelTokenService.getBalance(this.account).subscribe(
        //       result => {
        //           console.log(result);
        //       },
        //       error => {
        //           console.log(error);
        //       }
        //   );
    // console.log("Refreshing balance");

    // try {
    //   const deployedAngelToken = await this.AngelToken.deployed();
    //   console.log(deployedAngelToken);
    //   console.log("Account", this.model.account);
    //   const AngelTokenBalance = await deployedAngelToken.balanceOf(
    //     this.model.account
    //   );
    //   // const AngelTokenBalance = await deployedAngelToken.getBalance.call(this.model.account);
    //   console.log("Found balance: " + AngelTokenBalance);
    //   this.model.balance = AngelTokenBalance;
    // } catch (e) {
    //   console.log(e);
    //   this.setStatus("Error getting balance; see log.");
    // }
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
