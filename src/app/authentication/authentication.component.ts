import { Component, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { trace } from '@angular/fire/compat/performance';
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  private readonly userDisposable: Subscription | undefined;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(
    public readonly auth: AngularFireAuth,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    if (!isPlatformServer(platformId)) {
      this.userDisposable = this.auth.authState
        .pipe(
          trace('auth'),
          map((u) => !!u)
        )
        .subscribe((isLoggedIn) => {
          this.showLoginButton = !isLoggedIn;
          this.showLogoutButton = isLoggedIn;
        });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async loginAnonymously() {
    const user = await this.auth.signInAnonymously();
    // TODO sign into offline app
  }

  logout() {
    this.auth.signOut();
    // TODO sign out of offline app
  }
}
