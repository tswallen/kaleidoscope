import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ResultsComponent } from './form/results/results.component';

const formsRoutes: Routes = [
  {
    path: ':form',
    component: FormComponent,
  },
  {
    path: ':form/results/:id',
    component: ResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(formsRoutes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
