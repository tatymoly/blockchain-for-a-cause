import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

@Injectable()
export class LoginService {
  private user: Observable<firebase.User>;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
  }
  login(email: string, password: string) {
    return this._firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => {});
  }
}
