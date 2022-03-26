import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapsComponent } from './caps/caps.component';
import { FormComponent } from './form/form.component';
import { PdiComponent } from './pdi/pdi.component';
import { ProdromalComponent } from './prodromal/prodromal.component';
import { QpeComponent } from './qpe/qpe.component';

const formsRoutes: Routes = [
  {
    path: 'prodromal',
    component: ProdromalComponent,
  },
  {
    path: 'qpe',
    component: QpeComponent,
  },
  {
    path: 'pdi',
    component: PdiComponent,
  },
  {
    path: 'caps',
    component: CapsComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(formsRoutes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
