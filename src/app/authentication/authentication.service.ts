import { Component, Injectable, Input, Optional } from '@angular/core';

import { Auth, authState, EmailAuthProvider, linkWithCredential, sendSignInLinkToEmail, signInAnonymously, User } from '@angular/fire/auth';
import { traceUntilFirst } from 'rxfire/performance';
import { catchError, EMPTY, from, Observable, of, Subscription, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { MessageInfo, MessageService } from '../message.service';
import { randomPassword, upper } from 'secure-random-password';
import { signOut } from '@firebase/auth';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  constructor(@Optional() private auth: Auth, private messageService: MessageService, private modalService: NgbModal) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe();
    }
  }

  actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true,
  };

  loginAnonymously() {
    return from(signInAnonymously(this.auth)).pipe(
      tap(_ => this.log({ header: 'Success', body: 'Logged in anonymously' })),
      catchError(this.handleError<any>('loginAnonymously'))
    );
  }

  sendEmail(email: string) {
    return from(sendSignInLinkToEmail(this.auth, email, environment.actionCodeSettings)).pipe(
      tap(_ => this.log({ header: 'Success', body: `An email was sent to ${email}` })),
      catchError(this.handleError<any>(`sendEmail email=${email}`))
    );
  }

  createRealUser(email: string) {
    const password = randomPassword({ length: 16, characters: upper });
    const credential = EmailAuthProvider.credential(email, password);
    return from(linkWithCredential(this.auth.currentUser!, credential)).pipe(
      tap(_ => {
        this.log({ header: 'Success', body: `User created with ${email}` });
        this.showPasswordModal(password);
      }),
      catchError(this.handleError<any>(`createRealUser email=${email}`))
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

  constructor(public activeModal: NgbActiveModal) {}
}
