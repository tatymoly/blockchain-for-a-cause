import { Injectable } from "@angular/core";

import { Observable, Subject } from 'rxjs';
// import { fromPromise } from 'rxjs/observable/fromPromise';

// import { environment } from '../../environments/environment';
declare let require: any;
const Web3 = require("web3");

declare var window: any;

@Injectable()
export class Web3Service {
  public web3: any;
  public accountsObservable = new Subject<string[]>();

  constructor() {
    this.checkAndInstantiateWeb3();
  }

  checkAndInstantiateWeb3 = () => {
    if (typeof window.web3 !== "undefined") {
      console.warn(
        "Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask"
      );
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        "No web3 detected. Falling back to ${environment.HttpProvider}. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask"
      );
      this.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:7545")
      );
    }
  };

  getAccounts(): Observable<any> {
    return Observable.create(observer => {
      this.web3.eth.getAccounts((err, accs) => {
        if (err != null) {
          observer.error("There was an error fetching your accounts.");
        }

        if (accs.length === 0) {
          observer.error(
            "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
          );
        }

        observer.next(accs);
        observer.complete();
      });
    });
  }
}
