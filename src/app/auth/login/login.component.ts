import { Component, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from "../../shared/services/index";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import * as firebase from "firebase/app";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.scss"]
})
export class LoginComponent {
  loginForm: FormGroup;
  invalidCredentials = false;
  loading;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    @Inject(FormBuilder) private fb: FormBuilder
  ) {
    this.loginFormValid();
  }

  loginFormValid() {
    this.loginForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.email, Validators.maxLength(90)]
      ],
      password: [null, [Validators.required, Validators.maxLength(90)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService
        .login(
          this.loginForm.get("email").value,
          this.loginForm.get("password").value
        )
        .then(result => {
          console.log(result);
          if (result) {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.SESSION)
              .then(() => {
                //TO DO
              })
              .catch(error => {
                //TO DO
              });
            this.router.navigate(["mi-cuenta"]);
          } else {
            this.invalidCredentials = true;
            console.log("error");
          }
        })
        .catch(error => {});
    }
  }
}
