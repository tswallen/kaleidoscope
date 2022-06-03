import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private router: Router
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
      this.formService.submitForm(this.model, id).subscribe();
      this.router.navigate(['forms', form, 'results', id]);
      this.formGroup.reset();
    }
  }
}
