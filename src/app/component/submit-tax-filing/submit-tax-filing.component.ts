import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StepBar } from './submit-tax-filing';

@Component({
  selector: 'app-submit-tax-filing',
  templateUrl: './submit-tax-filing.component.html',
  styleUrls: ['./submit-tax-filing.component.scss']
})
export class SubmitTaxFilingComponent implements OnInit {

  /* Step variable */
  currentStep: any;
  stepBar = StepBar;

  step1Form = new FormGroup({
    filingType: new FormControl(null, Validators.required),
    month: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    saleAmount: new FormControl(null, Validators.required),
    taxAmount: new FormControl(null, Validators.required),
    surcharge: new FormControl({ value: 0, disabled: true }),
    penalty: new FormControl({ value: 0, disabled: true }),
    totalAmount: new FormControl({ value: 0, disabled: true }),
  });

  constructor() { }

  ngOnInit() {
    this.currentStep = this.stepBar.INPUT;
  }

  changeStep(stepToGo: StepBar) {
    if (stepToGo === this.currentStep) { return; }

    if(!this.step1Form.valid){
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Invalid Data',
        confirmButtonText: 'Close'
      });
      return;
    }
    this.currentStep = stepToGo;
  }

}
