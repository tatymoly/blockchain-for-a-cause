import { Component, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

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

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.requestFormValid();
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
    setTimeout(() => {
      this.success = true;
    }, 3000);
  }
}
