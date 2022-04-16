import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { AppComponent } from './app.component';
import { FormsModule } from './forms/forms.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

import { FunctionsModule } from '@angular/fire/functions';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AuthenticationService } from './authentication/authentication.service';
import { getFirestore } from '@angular/fire/firestore/firebase';
import { provideFirestore } from '@angular/fire/firestore';

const config = {
  apiKey: 'AIzaSyCzb76mjJ7VqXDrSjeq74FLtRkIP83rr8o',
  authDomain: 'kaleidoscope-psychosis.firebaseapp.com',
  projectId: 'kaleidoscope-psychosis',
  storageBucket: 'kaleidoscope-psychosis.appspot.com',
  messagingSenderId: '446067106424',
  appId: '1:446067106424:web:b28a5a1680324a2720838d',
  measurementId: 'G-CRZCK7GJDS',
};

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FunctionsModule,
    provideFirebaseApp(() => initializeApp(config)),
    provideFirestore(() => {
      const firestore = getFirestore();
      return firestore;
    }),
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormsModule,
  ],
  providers: [AuthenticationService],
  declarations: [AppComponent, HomeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
