import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { ProdromalComponent } from './forms/prodromal/prodromal.component';
import { QpeComponent } from './forms/qpe/qpe.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: FormsComponent },
  { path: 'forms/prodromal', component: ProdromalComponent },
  { path: 'forms/qpe', component: QpeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
