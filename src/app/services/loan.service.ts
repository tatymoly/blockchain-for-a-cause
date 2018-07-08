import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
// import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from "./web3.service";

declare let require: any;
const loanArtifacts = require("../../../build/contracts/Loan.json");
const contract = require("truffle-contract");

@Injectable()
export class LoanService {
  Loan = contract(loanArtifacts);

  constructor(private web3Ser: Web3Service) {
    // Bootstrap the AngelToken abstraction for Use
    this.Loan.setProvider(web3Ser.web3.currentProvider);
  }

  requestLoan(
    lenderName,
    borrowerName,
    borrowerIdNumber,
    borrowerAddress,
    loanAmount,
    tranchesTmp,
    interestRate,
    signingDate,
    firstDrawdownDate
  ): Observable<any> {
    let meta;
    return Observable.create(observer => {
      this.Loan.deployed()
        .then(instance => {
          meta = instance;
          return meta.requestLoan(
            lenderName,
            borrowerName,
            borrowerIdNumber,
            borrowerAddress,
            loanAmount,
            tranchesTmp,
            interestRate,
            signingDate,
            firstDrawdownDate
          );
        })
        .then(() => {
          observer.next();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        }); //TODO: Si respuesta es positiva, realizar la transferencia a cliente.
    });
  }

  confirmLoan(): Observable<any> {
    let meta;
    return Observable.create(observer => {
      this.Loan.deployed()
        .then(instance => {
          meta = instance;
          return meta.confirmLoan();
        })
        .then(() => {
          observer.next();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  getToTalLoanAmount(): Observable<any> {
    return Observable.create(observer => {
      this.Loan.deployed()
        .then(instance => {
          console.log(instance);
          return instance.getToTalLoanAmount.call();
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  getInitialDrawdownAmount(): Observable<any> {
    return Observable.create(observer => {
      this.Loan.deployed()
        .then(instance => {
          console.log(instance);
          return instance.getInitialDrawdownAmount.call();
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  findLoansInterestRate(): Observable<any> {
    return Observable.create(observer => {
      this.Loan.deployed()
        .then(instance => {
          console.log(instance);
          return instance.findLoansInterestRate.call();
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  initialCashPayment(date: string): Observable<any> {
    let meta;
    return Observable.create(observer => {
      this.Loan.deployed()
        .then(instance => {
          meta = instance;
          return meta.initialCashPayment(date);
        })
        .then(() => {
          observer.next();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  findBorrowerDrawdownAmount(): Observable<any> {
    return Observable.create(observer => {
      this.Loan.deployed()
        .then(instance => {
          console.log(instance);
          return instance.findBorrowerDrawdownAmount.call();
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  findRegularDrawdownAmount(): Observable<any> {
    return Observable.create(observer => {
      this.Loan.deployed()
        .then(instance => {
          console.log(instance);
          return instance.findRegularDrawdownAmount.call();
        })
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }
}
