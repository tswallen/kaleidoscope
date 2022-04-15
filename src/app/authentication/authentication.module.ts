import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication.service';

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
    CommonModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [AuthenticationService]
})
export class AuthenticationModule { }