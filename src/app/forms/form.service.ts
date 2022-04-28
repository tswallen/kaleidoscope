import { Injectable } from '@angular/core';
import { Auth, sendSignInLinkToEmail } from '@angular/fire/auth';
import { setDoc, doc, Firestore } from '@angular/fire/firestore';
import { catchError, from, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { MessageInfo, MessageService } from '../message.service';
import { forms } from './forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(private firestore: Firestore, private messageService: MessageService, private auth: Auth) {}

  getForm(form: string) {
    return forms.find((f) => f.route === form);
  }

  submitForm(form: object) {
    const id = new Date().getTime() + Math.floor(Math.random() * (10000 - 0) + 0);
    return from(setDoc(doc(this.firestore, 'forms/prodromal/submissions', id.toString()), {data: JSON.stringify(form)})).pipe(
      tap(_ => this.log({header: 'Success', body: 'Your form was submitted!'})),
      catchError(this.handleError<any>(`submitForm id=${id}`))
    );
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
