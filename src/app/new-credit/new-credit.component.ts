import { Component, Inject } from "@angular/core";
import { AngelTokenService } from "../services/angel-token.service";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: "app-credit",
  templateUrl: "new-credit.component.html",
  styleUrls: ["new-credit.component.scss"]
})
export class NewCreditComponent {
  requestForm: FormGroup;
  validRequest = false;
  totalTokens;
  amount;
  interes;
  cuotaMensual;
  cuotas;
  success = false;
  loading = false;

  model = {
    amount: 5,
    receiver: "",
    balance: 0,
    account: ""
  };

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    private angelTokenService: AngelTokenService
  ) {
    this.requestFormValid();
  }
  sendCoin(amount) {
    // const amount = this.model.amount;
    // const receiver = this.model.receiver;

    console.log("Sending coins" + amount + " to " + "0xb1d28E599359545060F29eE73DeecE5ec69f03A4");

    this.angelTokenService
      .sendCoin(
        "0x2e174d31Bc05B503E038B9350606324eF5B84CF1",
        "0xb1d28E599359545060F29eE73DeecE5ec69f03A4",
        amount
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          console.log(response.c[0]);
          // this.refreshBalance();
        },
        error => {
          // this.refreshBalance();
          console.log(error);
        }
      );
  }

  requestFormValid() {
    this.requestForm = this.fb.group({
      amount: [null, [Validators.required]],
      tokens: [null, [Validators.required]],
      rut: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      payments: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems);
    console.log("sucess");
    this.tokenValue();
  }

  tokenValue() {
    if (this.requestForm.get("amount").value !== "") {
      this.totalTokens = this.requestForm.get("amount").value / 500;
    }
  }

  request() {
    if (this.requestForm.valid) {
      this.validRequest = true;
      this.cuotas = this.requestForm.get("payments").value;
      this.amount = this.requestForm.get("amount").value;
      this.interes = 1.5;
      this.cuotaMensual =
        (this.requestForm.get("amount").value * 0.15) / this.cuotas;
    }
  }
  requestCredit() {
    this.loading = true;
    this.sendCoin(this.amount);
    setTimeout(() => {
      this.success = true;
    }, 3000);
  }
  // setAmount(e) {
  //   console.log("Setting amount: " + e.target.value);
  //   this.model.amount = e.target.value;
  // }

  // setReceiver(e) {
  //   console.log("Setting receiver: " + e.target.value);
  //   this.model.receiver = e.target.value;
  // }
}
