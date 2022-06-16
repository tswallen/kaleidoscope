import { Injectable } from '@angular/core';
import { setDoc, doc, Firestore } from '@angular/fire/firestore';
import { docData } from 'rxfire/firestore';
import { catchError, from, Observable, of, tap } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { MessageInfo, MessageService } from '../message.service';
import { UsersService } from '../users/users.service';
import { forms } from './forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(private firestore: Firestore, private messageService: MessageService, private usersService: UsersService, private authenticationService: AuthenticationService) { }

  getForm(form: string) {
    return forms.find((f) => f.route === form);
  }

  getResults(id: string) {
    const ref = doc(this.firestore, `forms/prodromal/submissions/${id}`);
    return docData(ref);
  }

  submitForm(form: any, formName: any, id: any) {
    this.handleUser(form.personal!.email!, form, formName, id);
  }

  handleUser(email: string, form: any, formName: any, id: any) {
    this.authenticationService.user.subscribe(user => {

      if (user && user.uid) {
        this.usersService.addCompletedForm(user.uid, formName);
        return from(setDoc(doc(this.firestore, `forms/${formName}/submissions`, id.toString()), { data: JSON.stringify(form) })).pipe(
          tap(_ => this.log({ header: 'Success', body: 'Your form was submitted!' })),
          catchError(this.handleError<any>(`submitForm id=${id}`))
        );
      }
      else {
        if (!email) {
          this.authenticationService.loginAnonymously().subscribe(_ => //{if (user.forms) {this.usersService.addCompletedForm(user.uid, formName)}}
          {
            this.usersService.addCompletedForm(user.uid, formName);
            return from(setDoc(doc(this.firestore, `forms/${formName}/submissions`, id.toString()), { data: JSON.stringify(form) })).pipe(
              tap(_ => this.log({ header: 'Success', body: 'Your form was submitted!' })),
              catchError(this.handleError<any>(`submitForm id=${id}`))
            );
          }
          );
        }
        else {
          this.authenticationService.signUp(email).subscribe(_ => {
            this.usersService.addCompletedForm(user.uid, formName);
            return from(setDoc(doc(this.firestore, `forms/${formName}/submissions`, id.toString()), { data: JSON.stringify(form) })).pipe(
              tap(_ => this.log({ header: 'Success', body: 'Your form was submitted!' })),
              catchError(this.handleError<any>(`submitForm id=${id}`))
            );
          });
        }
      }
    })
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log({ header: 'Error', body: `${operation} failed: ${error.message}` });

      return of(result as T);
    };
  }

  private log(message: MessageInfo) {
    this.messageService.add(message);
  }
}
