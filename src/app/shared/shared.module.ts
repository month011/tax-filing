import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowRequestConfirmComponent } from './component/modal/show-request-confirm/show-request-confirm.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ShowRequestConfirmComponent],
  entryComponents: [ShowRequestConfirmComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule { }
