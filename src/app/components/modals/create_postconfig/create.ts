import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'create-component',
  templateUrl: 'create.html'
})

export class CreateConfigComponent {

  constructor( public activeModal  : NgbActiveModal ) {}

}
