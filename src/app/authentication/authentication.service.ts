import { Injectable, Optional } from '@angular/core';

import { Auth, authState, sendSignInLinkToEmail } from '@angular/fire/auth';
import { catchError, EMPTY, from, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageInfo, MessageService } from '../message.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public readonly user: Observable<any | null> = EMPTY;

  actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true,
  };

  constructor(@Optional() private auth: Auth, private messageService: MessageService) {
    if (auth) {
      this.user = authState(this.auth);
    }
  }

    sendEmail(email: string) {
      return from(sendSignInLinkToEmail(this.auth, email, environment.actionCodeSettings)).pipe(
        tap(_ => this.log({header: 'Success', body: `An email was sent to ${email}`})),
        catchError(this.handleError<any>(`sendEmail email=${email}`))
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

    // TODO sign into offline app
  }
