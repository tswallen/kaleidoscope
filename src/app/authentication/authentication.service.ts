import { Injectable, Optional } from '@angular/core';

import { Auth, authState, sendSignInLinkToEmail } from '@angular/fire/auth';
import { EMPTY, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public readonly user: Observable<any | null> = EMPTY;

  actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true,
  };

  constructor(@Optional() private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth);
    }
  }

  async login(email: string) {
    return await sendSignInLinkToEmail(
      this.auth,
      email,
      this.actionCodeSettings
    );

    // TODO sign into offline app
  }
}
