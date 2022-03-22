import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import {RouterModule} from '@angular/router';
import { ProdromalComponent } from './prodromal/prodromal.component';
import { QpeComponent } from './qpe/qpe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormsRoutingModule } from './forms-routing.module';

@NgModule({
  imports: [
    FormsRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule
  ],
  declarations: [FormsComponent, ProdromalComponent, QpeComponent],
  exports: [FormsComponent, ProdromalComponent, QpeComponent]
})
export class FormsModule { }