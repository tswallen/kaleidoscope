import {Injectable, Optional} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {doc, Firestore, setDoc} from '@angular/fire/firestore';
import {docData} from 'rxfire/firestore';
import {catchError, from, Observable, of, switchMap, tap} from 'rxjs';
import {AuthenticationService} from '../authentication/authentication.service';
import {MessageInfo, MessageService} from '../message.service';
import {UsersService} from '../users/users.service';
import {forms} from './forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(@Optional() private auth: Auth, private firestore: Firestore, private messageService: MessageService, private usersService: UsersService, private authenticationService: AuthenticationService) { }

  getForm(form: string) {
    return forms.find((f) => f.route === form);
  }

  getResults(id: string, formName: any) {
    const ref = doc(this.firestore, `forms/${formName}/submissions/${id}`);
    return docData(ref);
  }



  submitForm(form: any, formName: any, id: any) {
    const email = form.personal?.email;
    if (!email) { // If user is anonymous
      return this.authenticationService.loginAnonymously().pipe(
        switchMap(_ => {
          return from(setDoc(doc(this.firestore, `forms/${formName}/submissions`, id.toString()), { data: JSON.stringify(form) }))
            .pipe(
            tap(_ => this.log({ header: 'Success', body: 'Your form was submitted!' })),
            catchError(this.handleError<any>(`submitForm id=${id}`)))
        }),
        switchMap(res => {
          console.log('About to save user info', res);
          return this.usersService.addCompletedForm(this.auth.currentUser?.uid as string, formName).pipe(
          )
        })
      )
    } else {
      return of(null)
    }
  }


  submitForm2(form: any, formName: any, id: any) {
    const email = form.personal!.email!;
    if (!email) { // If user is anonymous
      return this.authenticationService.loginAnonymously().pipe(
        switchMap(_ => {
          return from(setDoc(doc(this.firestore, `forms/${formName}/submissions`, id.toString()), { data: JSON.stringify(form) })).pipe(
            tap(_ => this.log({ header: 'Success', body: 'Your form was submitted!' })),
            catchError(this.handleError<any>(`submitForm id=${id}`))).pipe(switchMap(_ => { return this.usersService.addCompletedForm(this.auth?.currentUser?.uid!, formName) }))
        })
      );
    }
    return;
      this.authenticationService.user.pipe(switchMap(user => {
      const isLoggedIn = user && user.uid;
      if (isLoggedIn) { // If logged in, add submission
        return from(setDoc(doc(this.firestore, `forms/${formName}/submissions`, id.toString()), { data: JSON.stringify(form) })).pipe(
          tap(_ => this.log({ header: 'Success', body: 'Your form was submitted!' })),
          catchError(this.handleError<any>(`submitForm id=${id}`))).pipe(
            // Make sure submission is recorded in users table
            switchMap(_ => { return this.usersService.addCompletedForm(user.uid, formName) })
          );
      }
      else {
        if (!email) { // If user is anonymous
          return this.authenticationService.loginAnonymously().pipe(
            switchMap(_ => {
              return from(setDoc(doc(this.firestore, `forms/${formName}/submissions`, id.toString()), { data: JSON.stringify(form) })).pipe(
                tap(_ => this.log({ header: 'Success', body: 'Your form was submitted!' })),
                catchError(this.handleError<any>(`submitForm id=${id}`))).pipe(
                  switchMap(_ => {return this.usersService.getUser(this.auth.currentUser?.uid as string);}),
                  // Make sure submission is recorded in users table
                  //switchMap(_ => { return this.usersService.addCompletedForm(user.uid, formName) })
                )
            })
          );
        }
        else { // If user is not anoymous (has provided email)
          return this.authenticationService.signUp(email).pipe(
            switchMap(_ => {
              return from(setDoc(doc(this.firestore, `forms/${formName}/submissions`, id.toString()), { data: JSON.stringify(form) })).pipe(
                tap(_ => this.log({ header: 'Success', body: 'Your form was submitted!' })),
                catchError(this.handleError<any>(`submitForm id=${id}`))).pipe(
                  // Make sure submission is recorded in users table
                  switchMap(_ => { return this.usersService.addCompletedForm(user.uid, formName) })
                )
            })
          );
        }
      }
    })).subscribe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      alert('Error')

      console.error(error);

      this.log({ header: 'Error', body: `${operation} failed: ${error.message}` });

      return of(result as T);
    };
  }

  private log(message: MessageInfo) {
    this.messageService.add(message);
  }
}
