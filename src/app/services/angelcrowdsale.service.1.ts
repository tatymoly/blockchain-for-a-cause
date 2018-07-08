import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

declare let require: any;
const angelHackCrowdsaleArtifacts = require("../../../build/contracts/AngelHackCrowdsale.json");
const angelTokenArtifacts = require("../../../build/contracts/AngelHack.json");
const contract = require('truffle-contract');

@Injectable()
export class AngelHackCrowdsaleService {
  AngelHackCrowdsale = contract(angelHackCrowdsaleArtifacts);
  AngelToken = contract(angelTokenArtifacts);

  constructor(private web3Ser: Web3Service) {
    // Bootstrap the AngelHackCrowdsale abstraction for Use
    this.AngelHackCrowdsale.setProvider(web3Ser.web3.currentProvider);
  }

  getBalance(account): Observable<number> {
    console.log("hola");

    return Observable.create(observer => {
      this.AngelHackCrowdsale.deployed()
        .then(instance => {
          console.log(instance);
          return instance.getBalance.call(account, { from: account });
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
  // getSupply(): Observable<number> {
  // 	return Observable.create(observer => {
  // 		this.AngelHackCrowdsale.deployed()
  // 			.then(instance => {
  // 				console.log(instance.address.getBalance.call(account, { from: account }));
  // 				return instance.getSupply.call();
  // 			})
  // 			.then(value => {
  // 				observer.next(value);
  // 				observer.complete();
  // 			})
  // 			.catch(e => {
  // 				console.log(e);
  // 				observer.error(e);
  // 			});
  // 	});
  // }

  sendCoin(from, to, amount): Observable<any> {
    let meta;
    return Observable.create(observer => {
      this.AngelHackCrowdsale.deployed()
        .then(instance => {
          meta = instance;
          return meta.sendCoin(to, amount, {
            from: from,
            gas: 100000
          });
        })
        .then(() => {
          observer.next();
          observer.next();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }
}
