import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";
import {UsersModel} from "../../models/users.model";
import {ChallengeCreateModel} from "../../models/challenge-create.model";
import {ChallengeCreateService} from "../service/challenge-create.service";
import {EventManager} from "../service/event-manager.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-challenge-create-new',
  templateUrl: './challenge-create-new.component.html',
  styleUrls: ['./challenge-create.component.scss']
})
export class ChallengeCreateNewComponent implements OnInit {


  // @ts-ignore
  users = new UsersModel();

  users1: UsersModel = {
    "id": 1,
    "username": "duncan",
    "country": "australia",
    "password": "123"
  };

  // @ts-ignore
  challengeCreate = new ChallengeCreateModel();

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private challengeCreateService: ChallengeCreateService,
              private toastr: ToastrService,
              private eventManager: EventManager,
              private datePipe: DatePipe,
              ) { }

  createChallengeForm = this.fb.group({
    id: [null, [Validators.required]],
    challengeName: [null, [Validators.required]],
    challengeDateCreate: [null, [Validators.required]],
    selected: [null, [Validators.required]],
    avalable: [null, [Validators.required]],
  });

  ngOnInit(): void {
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  onCreateChallenge(){

    this.challengeCreate.challengeName = this.createChallengeForm.value.challengeName;
    this.challengeCreate.challengeDateCreate = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
    this.challengeCreate.selected = true;
    this.challengeCreate.avalable = true;
    this.challengeCreate.users = this.users1;

    this.challengeCreateService.createChallenges(this.challengeCreate).subscribe(
      (res: any) => {
        this.eventManager.broadcast({ name: 'challengeListModification', content: 'challenge create' });
          this.toastr.success(res.body.message);
          this.clear();
      }, (error) => {
        this.toastr.error(error);
      }
    )

  }

}
