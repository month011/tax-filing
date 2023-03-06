import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitTaxFilingComponent } from './submit-tax-filing.component';
import { RouterModule } from '@angular/router';
import { ConfirmReviewComponent } from './confirm-review/confirm-review.component';
import { InputDetailComponent } from './input-detail/input-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    RouterModule.forChild([
      { path: '', component: SubmitTaxFilingComponent },

    ]),
    SharedModule
  ],
  declarations: [
    SubmitTaxFilingComponent,
    InputDetailComponent,
    ConfirmReviewComponent,]
})
export class SubmitTaxFilingModule { }
