import { Component, Injectable, Input, Optional } from '@angular/core';

import { Auth, authState, createUserWithEmailAndPassword, EmailAuthProvider, linkWithCredential, sendSignInLinkToEmail, signInAnonymously, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { catchError, EMPTY, from, merge, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { MessageInfo, MessageService } from '../message.service';
import { randomPassword, upper } from 'secure-random-password';
import { signOut } from '@firebase/auth';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../users/users.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public readonly user: Observable<any> = EMPTY;

  constructor(@Optional() private auth: Auth, private messageService: MessageService, private usersService: UsersService, private modalService: NgbModal) {
    if (auth) {
      this.user = authState(this.auth);
    }
  }

  /**
   * Signs user up. If the user is already anonymous, we link their email to the anonymous account. If there is no user, one is created with a random password.
   * @param email 
   * @returns 
   */
  signUp(email: string): Observable<any> {
    const password = randomPassword({ length: 16, characters: upper });
    if (this.auth.currentUser && this.auth.currentUser.isAnonymous) {
      const credential = EmailAuthProvider.credential(email, password);
    return from(linkWithCredential(this.auth.currentUser!, credential)).pipe(
      tap(_ => {
        this.log({ header: 'Success', body: `User created with ${email}` });
        this.showPasswordModal(password);
      }),
      catchError(this.handleError<any>(`linkEmail email=${email}`))
    );
    }
    else {
      return from(createUserWithEmailAndPassword(this.auth, email, password!)).pipe(
        tap(_ => {
          this.log({ header: 'Success', body: `Signed up with ${email}` });
          this.showPasswordModal(password);
        }),
        tap(_ => console.log(_)),
        catchError(this.handleError<any>('signUp'))
      );
    }
  }

  /**
   * Logs in user anonymously
   * @returns 
   */
  loginAnonymously(): Observable<any> {
    return from(signInAnonymously(this.auth)).pipe(
      tap(_ => this.log({ header: 'Success', body: 'Logged in anonymously' })),
      catchError(this.handleError<any>('loginAnonymously')),
      switchMap(credential => {
        // TODO: make this "getUser" instead of addUser, addUser is invoked by getUser if it doesn't get a user.
        //return this.usersService.addUser(credential?.user.uid);
        return this.usersService.getUser(credential?.user.uid);
      })
    );
  }

  /**
   * Triggers an OTP login
   * @param email 
   * @returns 
   */
  login(email: string): Observable<any> {
    return from(sendSignInLinkToEmail(this.auth, email, environment.actionCodeSettings)).pipe(
      tap(_ => this.log({ header: 'Success', body: `An email was sent to ${email}` })),
      catchError(this.handleError<any>(`login email=${email}`))
    );
  }

  logout() {
    return from(signOut(this.auth)).pipe(
      tap(_ => this.log({ header: 'Success', body: 'Logged out' })),
      catchError(this.handleError<any>('logout'))
    );
  }

  showPasswordModal(password: string) {
    const modalRef = this.modalService.open(PasswordModalContent);
    modalRef.componentInstance.password = password;
  }

  // TODO: move this to the message service
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

  // TODO sign into offline app
}


@Component({
  selector: 'kaleidoscope-password-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Master Password</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
    <p class="lead">This is your master password for accessing your data should you ever need it, please keep it somewhere safe. <b>We email you links to sign in, you won't need this password for regular sign ins.</b></p>
      <h1>{{ password }}</h1>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class PasswordModalContent {
  @Input() password: string = '';

  constructor(public activeModal: NgbActiveModal) { }
}
