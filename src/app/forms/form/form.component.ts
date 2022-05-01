import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { FormService } from '../form.service';
import { Form } from '../form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form!: Form;
  formGroup = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  submitted!: boolean;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getFields();
  }

  getFields(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.form = this.formService.getForm(id!)!;
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const id = new Date().getTime() + Math.floor(Math.random() * (10000 - 0) + 0);
      this.formService.submitForm(this.model, id).subscribe();
      this.submitted = true;
    }
  }
}
