import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-remove-item-modal',
  templateUrl: './remove-item-modal.component.html',
  styleUrls: ['./remove-item-modal.component.css']
})
export class RemoveItemModalComponent implements OnInit {
  @Input() foodName: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
