import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth/auth';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user;

  actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true,
  };

  constructor(public readonly auth: AngularFireAuth) {}

  async login(email: string) {
    this.user = await this.auth.sendSignInLinkToEmail(
      email,
      this.actionCodeSettings
    );
    // TODO sign into offline app
  }
}
