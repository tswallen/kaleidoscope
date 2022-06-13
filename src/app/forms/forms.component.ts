import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { EMPTY, Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { forms } from './forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  user: Observable<any> = EMPTY;
  forms = forms;

  constructor(private authenticationService: AuthenticationService) {
    this.user = authenticationService.user;
  }

  ngOnInit() {}
}
