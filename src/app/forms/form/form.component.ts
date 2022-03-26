import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFormOptions } from '@ngx-formly/core/lib/core';
import { pdi } from '../pdi/pdi';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  labels: string[] = [];
  fields: FormlyFieldConfig[];

  constructor() {}

  ngOnInit() {
    this.fields = pdi;
  }

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
