import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-show-request-confirm',
  templateUrl: './show-request-confirm.component.html',
  styleUrls: ['./show-request-confirm.component.scss']
})
export class ShowRequestConfirmComponent implements OnInit {
  @Output() complete: EventEmitter<{ isChanged: boolean, message: string }> = new EventEmitter();
  
  formGroup: FormGroup | undefined;
  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  close() {
    this.bsModalRef.hide();
  }

}
