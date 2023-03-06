import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';
import { ShowRequestConfirmComponent } from 'src/app/shared/component/modal/show-request-confirm/show-request-confirm.component';
import Swal from 'sweetalert2';
import { StepBar } from '../submit-tax-filing';

@Component({
  selector: 'app-confirm-review',
  templateUrl: './confirm-review.component.html',
  styleUrls: ['./confirm-review.component.scss']
})
export class ConfirmReviewComponent implements OnInit {
  /* Current step from container component */
  @Input() currentStep: any;

  /* Trigger container to change step */
  @Output() stepToGo: EventEmitter<StepBar> = new EventEmitter();

  @Input() formGroup: FormGroup | undefined;

  monthText: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  covertMonth() {
    const index = (this.formGroup?.get('month')?.value).startsWith('0') ? +(this.formGroup?.get('month')?.value).replace('0', '') - 1 : this.formGroup?.get('month')?.value - 1;

    return this.monthText[index];
  }

  back() {
    this.stepToGo.emit(StepBar.INPUT);
  }

  submit() {
    const modalRef = this.modalService.show(ShowRequestConfirmComponent, {
      class: 'modal-md',
      ignoreBackdropClick: true,
      keyboard: false,
      initialState: {
        formGroup: this.formGroup,
      }
    });

    // Subscribe to event and take only one emit event (to prevent memory leak).
    (modalRef.content as ShowRequestConfirmComponent).complete.pipe(take(1)).subscribe((value: {
      isChanged: boolean;
      message: string;
    }) => {
      setTimeout(() => {
        if (value.isChanged) {
          if (value.message) {
            modalRef.hide()
          }
        }

      });
    });
  }
}
