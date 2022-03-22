import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(formsRoutes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
