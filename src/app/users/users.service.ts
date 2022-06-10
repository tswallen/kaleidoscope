import { Injectable } from '@angular/core';
import { Firestore, setDoc } from '@angular/fire/firestore';
import { MessageInfo, MessageService } from '../message.service';
import { docData } from 'rxfire/firestore';
import { doc } from '@firebase/firestore';
import { catchError, from, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user;

  constructor(private firestore: Firestore, private messageService: MessageService) { }

  addUser(user: any, uid: any) {
    this.user = user;
    // TODO: make the backend do this
    return from(setDoc(doc(this.firestore, 'users', uid.toString()), user)).pipe(
      tap(_ => this.log({header: 'Success', body: 'User has been added!'})),
      catchError(this.handleError<any>(`addUser id=${uid}`))
    );
  }

  getUser(uid: string) {
    const ref = doc(this.firestore, `users/${uid}`);
    return docData(ref);
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
