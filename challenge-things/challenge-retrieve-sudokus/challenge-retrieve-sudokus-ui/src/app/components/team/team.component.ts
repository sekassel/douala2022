import { Component, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { InviteModalComponent } from '../invite-modal/invite-modal.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {


  invitation = {
    username: "",
    challengeId: "AEZ2",
    teamInvited: "Marquez",
    time: new Date()
  };

  challenges = [
    {
      challengeName: 'Drill country',
      createdBy: 'Ate',
    },
    {
      challengeName: 'Sudoku king',
      createdBy: 'Theone',   
    },
    {
      challengeName: 'Sudjutsu',
      createdBy: 'Ate',     
    }
  ];

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
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})

  }



}
