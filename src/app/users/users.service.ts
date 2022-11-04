import {Injectable, Optional} from '@angular/core';
import {arrayUnion, FieldValue, Firestore, setDoc, updateDoc} from '@angular/fire/firestore';
import {MessageInfo, MessageService} from '../message.service';
import {docData} from 'rxfire/firestore';
import {doc} from '@firebase/firestore';
import {catchError, from, Observable, of, switchMap, tap} from 'rxjs';
import {Auth} from '@angular/fire/auth';
import {assign, cloneDeep} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(@Optional() private auth: Auth, private firestore: Firestore, private messageService: MessageService) { }

  // Checked
  addUser(uid: any) {
    const user = {forms: ['there should be something below']};
    return from(setDoc(doc(this.firestore, 'users', uid.toString()), user)).pipe(
      tap(_ => this.log({header: 'Success', body: 'User has been added!'})),
      tap(_ => assign(this.auth.currentUser, user)),
      catchError(this.handleError<any>(`addUser id=${uid}`))
    );
  }

  // Checked
  getUser(uid: string) {
    const ref = doc(this.firestore, `users/${uid}`);
    return docData(ref).pipe(
      switchMap(d => {
        if (d !== undefined) {
          return of(null)
        } else {
          return this.addUser(uid)
        }
      }),
      tap(_ => this.log({header: 'Success', body: 'Got user!'})),
      catchError(this.handleError<any>(`getUser id=${uid}`))
    );
  }

  // FUCKED! ???? IS THE FORM TAKEN FROM THE URL BEFORE IT CHANGES?
  addCompletedForm(uid: string, form: string) {
    const form$ = cloneDeep(form).toString();
    const arr: FieldValue = arrayUnion(form$);
    console.log(arr);
    return from(updateDoc(doc(this.firestore, 'users', uid.toString()), {forms: arr})).pipe(
      tap(_ => this.log({header: 'Success', body: 'Updated user forms'})),
      catchError(this.handleError<any>(`addedCompletedForm id=${uid}`))
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
    console.info(message);
    this.messageService.add(message);
  }
}
