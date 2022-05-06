import { HttpClient } from '@angular/common/http';
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

  modalRef!: any;

  constructor(
    protected modalService: NgbModal,
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
  }

  open(content: any) {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result
      .then(
        (result: any) => {
          console.log(`Result: ${result}`);
          
        }, 
        (reason: any) => {
          console.log(`Reason: ${reason}`);
          
        });

  }

  async sendInvitation(content: any) {
    const payload = {
      username: "",
      challengeId: "AEZ2",
      teamInvited: "Marquez",
      time: new Date()
    };

    const invitation = {
      topic: 'publish',
      targetTopic: 'invite',
      payload: payload
    };


    await this.http.post<any>('http://localhost:3000/invite', invitation)
      .subscribe(
        data => {
          console.log(`invitatio sent:  \n${JSON.stringify(data, null, 3)}`);
          this.modalRef.close();
        },
        err => console.log(`error from post invitation \n ${JSON.stringify(err, null, 3)}`)
      );

  }



}
