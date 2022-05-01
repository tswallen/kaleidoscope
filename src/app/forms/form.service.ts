import { Injectable } from '@angular/core';
import { Auth, sendSignInLinkToEmail } from '@angular/fire/auth';
import { setDoc, doc, Firestore } from '@angular/fire/firestore';
import { catchError, from, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { MessageInfo, MessageService } from '../message.service';
import { forms } from './forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(private firestore: Firestore, private messageService: MessageService, private authenticationService: AuthenticationService) {}

  getForm(form: string) {
    return forms.find((f) => f.route === form);
  }

  submitForm(form: any) {
    const id = new Date().getTime() + Math.floor(Math.random() * (10000 - 0) + 0);
    this.handleUser(form.personal!.email!);
    //this.authenticationService.loginAnonymously().subscribe();
    return from(setDoc(doc(this.firestore, 'forms/prodromal/submissions', id.toString()), {data: JSON.stringify(form)})).pipe(
      tap(_ => this.log({header: 'Success', body: 'Your form was submitted!'})),
      catchError(this.handleError<any>(`submitForm id=${id}`))
    );
  }

  handleUser(email: string | undefined) {
    if (!email) {
      this.authenticationService.loginAnonymously().subscribe();
    }
    else {
      // TODO: handle if no existing user
      this.authenticationService.createRealUser(email).subscribe();
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log({header: 'Error', body: `${operation} failed: ${error.message}`});

      return of(result as T);
    };
  }

  private log(message: MessageInfo) {
    this.messageService.add(message);
  }
}
