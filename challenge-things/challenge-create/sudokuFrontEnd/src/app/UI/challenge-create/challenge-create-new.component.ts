import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-challenge-create-new',
  templateUrl: './challenge-create-new.component.html',
  styleUrls: ['./challenge-create.component.scss']
})
export class ChallengeCreateNewComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }
}
