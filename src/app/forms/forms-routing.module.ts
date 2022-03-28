import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';

const formsRoutes: Routes = [
  {
    path: ':id',
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(formsRoutes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
