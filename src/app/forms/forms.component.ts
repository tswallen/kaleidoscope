import { Component, OnInit } from '@angular/core';
import { forms } from './forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  forms = forms;

  constructor() {}

  ngOnInit() {}
}
