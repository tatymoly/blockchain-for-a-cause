import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { FormsModule } from "@angular/forms";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { APP_BASE_HREF } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: "/"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
