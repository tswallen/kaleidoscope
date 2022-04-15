import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormsRoutingModule } from './forms-routing.module';
import { FormComponent } from './form/form.component';
import { ResultsComponent } from './form/results/results.component';

import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  imports: [
    FormsRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule,
    AngularFireModule,
  ],
  declarations: [FormsComponent, FormComponent, ResultsComponent],
  exports: [FormsComponent, FormComponent, ResultsComponent],
})
export class FormsModule {}
