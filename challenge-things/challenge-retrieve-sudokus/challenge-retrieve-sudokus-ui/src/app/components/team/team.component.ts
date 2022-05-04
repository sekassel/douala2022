import { Component, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { InviteModalComponent } from '../invite-modal/invite-modal.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  content?: any;
  @Input()
  teamName!: string;

  @Input()
  creationDate!: string;

  @Input()
  challengeWon!: number;

  @Input()
  challengeLost!: number;


  constructor(
    protected modalService: NgbModal,
    protected vref:ViewContainerRef
  ) {
  }
  ngOnInit(): void {
   
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }



}
