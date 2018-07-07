import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { environment } from "../../../environments/environment";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@NgModule({
  imports: [
    LoginRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    CommonModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [HttpClient]
})
export class LoginModule {}
