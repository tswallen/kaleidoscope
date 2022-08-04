import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { FormService } from '../form.service';
import { Form } from '../form';
import { UsersService } from 'src/app/users/users.service';
import { Auth } from '@angular/fire/auth';

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

  constructor(
    @Optional() private auth: Auth,
    private route: ActivatedRoute,
    private formService: FormService,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getFields();
  }

  getFields(): void {
    const form = this.route.snapshot.paramMap.get('form');
    this.form = this.formService.getForm(form!)!;
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const form = this.route.snapshot.paramMap.get('form');
      const id = new Date().getTime() + Math.floor(Math.random() * (10000 - 0) + 0);
      this.formService.submitForm(this.model, form, id)?.subscribe(_ => this.usersService.addCompletedForm(this.auth.currentUser?.uid as string, form as string));
      this.router.navigate(['forms', form, 'results', id]);
      this.formGroup.reset();
    };

    }
  }
