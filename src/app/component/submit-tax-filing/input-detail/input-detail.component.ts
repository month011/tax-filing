import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { DropDownData, StepBar } from '../submit-tax-filing';

@Component({
  selector: 'app-input-detail',
  templateUrl: './input-detail.component.html',
  styleUrls: ['./input-detail.component.scss']
})
export class InputDetailComponent implements OnInit {
  /* Current step from container component */
  @Input() currentStep: StepBar | undefined;

  /* Trigger container to change step */
  @Output() stepToGo: EventEmitter<StepBar> = new EventEmitter();

  @Input() formGroup: FormGroup | undefined;

  monthText: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  yearList: string[] = [];
  monthList: DropDownData[] = [];
  fullMonthList: DropDownData[] = [];
  cerrentMonthList: DropDownData[] = [];
  calVAT = 0;
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.initDDL();
  }

  initDDL() {
    const currentYear = new Date().getFullYear();
    const currentMontth = new Date().getMonth();
    this.yearList = new Array(4).fill(0).map((e, i) => String(currentYear - i));
    this.fullMonthList = [];
    this.monthText.forEach((e, i) => {
      this.fullMonthList.push({
        itemValue: String(i + 1).padStart(2, '0'),
        itemLabel: e
      });
    });
    this.monthList = this.fullMonthList;
    this.cerrentMonthList = [];
    this.monthText.forEach((e, i) => {
      if (i <= currentMontth) {
        this.cerrentMonthList.push({
          itemValue: String(i + 1).padStart(2, '0'),
          itemLabel: e
        });
      }
    });
  }

  clearResultValidation() {
    if (this.formGroup?.get('filingType')?.value === '1') {
      this.formGroup?.get('surcharge')?.setValue(0);
      this.formGroup?.get('penalty')?.setValue(0);
    } else {
      this.formGroup?.get('penalty')?.setValue(200);
      this.saleAmountChange();
    }
  }

  onChangeMonth() {
    const currentYear = new Date().getFullYear();
    const currentMontth = new Date().getMonth();
    if (+this.formGroup?.get('month')?.value > +String(currentMontth + 1).padStart(2, '0')) {
      this.yearList = new Array(3).fill(0).map((e, i) => String((currentYear - 1) - i));
    } else {
      this.yearList = new Array(4).fill(0).map((e, i) => String(currentYear - i));
    }
  }

  onChangeYear() {
    const selectMonth = this.formGroup?.get('month')?.value;
    const currentYear = new Date().getFullYear();
    if (currentYear === +this.formGroup?.get('year')?.value) {
      this.monthList = this.cerrentMonthList;
      setTimeout(() => {
        this.monthList.filter(month => month.itemValue === this.formGroup?.get('month')?.value).length ? this.formGroup?.get('month')?.setValue(selectMonth) : this.formGroup?.get('month')?.setValue('01');
      });

    } else {
      this.monthList = this.fullMonthList;
      setTimeout(() => {
        this.formGroup?.get('month')?.setValue(selectMonth);
      });
    }


  }

  saleAmountChange() {
    if(this.formGroup?.get('saleAmount')?.value){
      this.calVAT =  parseFloat((this.formGroup?.get('saleAmount')?.value * 0.07).toFixed(2));
      this.formGroup?.get('taxAmount')?.setValue(this.calVAT);
    }
   

    this.calSurcharge();
  }

  taxAmountChange() {
    if ((this.calVAT - this.formGroup?.get('taxAmount')?.value > 20 || this.calVAT - this.formGroup?.get('taxAmount')?.value < -20) && this.formGroup?.get('saleAmount')?.value) {
      this.formGroup?.get('taxAmount')?.setValue(this.calVAT);
      this.calSurcharge();
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Invalid Tax',
        confirmButtonText: 'Close'
      });
      return;
    } else {
      this.calSurcharge();
    }
  }

  calSurcharge() {
    const calSurcharge = parseFloat((this.formGroup?.get('taxAmount')?.value * 0.1).toFixed(2));
    if (this.formGroup?.get('filingType')?.value === '0') {
      this.formGroup?.get('surcharge')?.setValue(calSurcharge);
      
      const total = parseFloat((calSurcharge + this.formGroup?.get('taxAmount')?.value + this.formGroup?.get('penalty')?.value).toFixed(2));
      this.formGroup?.get('totalAmount')?.setValue(total);
    
    } else {
      this.formGroup?.get('totalAmount')?.setValue(this.formGroup?.get('taxAmount')?.value);

    }

  }
  back(){
    this.stepToGo.emit(StepBar.INPUT);
  }

  next() {
    if (!this.formGroup?.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Invalid Data',
        confirmButtonText: 'Close'
      });
    } else {
      this.stepToGo.emit(StepBar.REVIEW);
    }
  }


}
