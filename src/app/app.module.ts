import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyArAOYKJNyw-BiAD_cxd-yhVOkgsAvMFLQ",
  authDomain: "partyplace-19ede.firebaseapp.com",
  databaseURL: "https://partyplace-19ede-default-rtdb.firebaseio.com",
  projectId: "partyplace-19ede",
  storageBucket: "partyplace-19ede.appspot.com",
  messagingSenderId: "227456356371",
  appId: "1:227456356371:web:f2e06b4e1d3dd65abeefe6",
  measurementId: "G-DESF6PVDE8"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
