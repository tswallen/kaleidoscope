import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core/lib/core';
import { FormService } from '../form.service';
import { Form } from '../form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: Form;
  formGroup = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  submitted: boolean;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getFields();
  }

  getFields(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.form = this.formService.getForm(id);
    if (this.form.fields[this.form.fields.length - 1].key === 'feedback') {
      return;
    }
    this.form.fields.push({
      className: 'row bg-primary text-light p-3',
      key: 'feedback',
      type: 'radio',
      templateOptions: {
        label:
          'Would you please be able to provide feedback on how helpful you found these questions to be?',
        required: true,
        options: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ],
      },
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.submitted = true;
    }
  }
}
