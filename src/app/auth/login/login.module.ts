import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { environment } from "../../../environments/environment";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { LoginService } from "../../shared/services/index";

@NgModule({
  imports: [
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CommonModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [HttpClient, LoginService]
})
export class LoginModule {}
