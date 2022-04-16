import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core/lib/core';
import { FormService } from '../form.service';
import { Form } from '../form';
import { AuthenticationService } from '../../authentication/authentication.service';

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
    private formService: FormService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getFields();
  }

  getFields(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.form = this.formService.getForm(id);
  }

  handleEmail(email: string): void {
    this.authenticationService.login(email);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      //if (this.model.email) {this.handleEmail(this.model.email)}
      this.submitted = true;
    }
  }
}
