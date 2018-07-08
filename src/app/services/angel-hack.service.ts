import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

declare let require: any;
const angelHackCrowdsaleArtifacts = require("../../../build/contracts/AngelHackCrowdsale.json");
const angelHackArtifacts = require('../../../build/contracts/AngelHack.json');
const contract = require('truffle-contract');

@Injectable()
export class AngelHackService {
  AngelHack = contract(angelHackArtifacts);
  AngelHackCrowdsale = contract(angelHackCrowdsaleArtifacts);
  crowdsale;
  tokenAddress;
  angelHackInstance;
  constructor(private web3Ser: Web3Service) {
    // Bootstrap the AngelHack abstraction for Use
    this.AngelHack.setProvider(web3Ser.web3.currentProvider);
    this.AngelHackCrowdsale.setProvider(web3Ser.web3.currentProvider);
  }
  trasferOwnership() {
    return Observable.create(observer => {
      this.AngelHackCrowdsale.deployed()
        .then(instance => {
          console.log(instance);
          this.crowdsale = instance;
          this.crowdsale.token().then(addr => {
            this.tokenAddress = addr;
            console.log(addr);
            this.angelHackInstance = this.AngelHack.at(addr);
            console.log(this.crowdsale.address);
            console.log(this.angelHackInstance);
            console.log(this.crowdsale.address);
            this.angelHackInstance.transferOwnership("0xf0d9828044fd544007b73b54c68a0b6c6edbb01a");
            return addr;
          });
          // return instance.getBalance.call(account, { from: account });
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
  // transferOwnerShip() {
  //   this.angelHackInstance.transferOwnership(this.tokenAddress);
  // }
  getBalanceAddress() {
    // return angelHackInstance
    //   .balanceOf(purchaser)
    //   .then(balance => balance.toString(10));
  }
  // GustavoCoinCrowdsale.deployed().then(inst => inst.sendTransaction({ from: purchaser, value: web3.toWei(5, "ether") }))
  getBalance(account): Observable<number> {
    console.log("hola");

    return Observable.create(observer => {
      this.AngelHack.deployed()
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
  // 		this.AngelHack.deployed()
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
      this.AngelHack.deployed()
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
