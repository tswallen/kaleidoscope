import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, Observable } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'kaleidoscope-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  user: Observable<any> = EMPTY;

  constructor(private authenticationService: AuthenticationService) {
    this.user = authenticationService.user;
  }

  logIn() {
    this.authenticationService.loginAnonymously().subscribe();
  }

  logOut() {
    this.authenticationService.logout().subscribe();
  }
}
