import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  {
  path: '',
  loadChildren: () => import('./component/submit-tax-filing/submit-tax-filing.module').then(m => m.SubmitTaxFilingModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
