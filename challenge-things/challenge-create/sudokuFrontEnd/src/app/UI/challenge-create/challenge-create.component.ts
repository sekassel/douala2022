import { Component, OnInit } from '@angular/core';
import { ChallengeCreateNewComponent } from './challenge-create-new.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChallengeCreateService} from "../service/challenge-create.service";
import {ChallengeCreateModel} from "../../models/challenge-create.model";

@Component({
  selector: 'app-challenge-create',
  templateUrl: './challenge-create.component.html',
  styleUrls: ['./challenge-create.component.scss']
})
export class ChallengeCreateComponent implements OnInit {

  challengeCreateModel: ChallengeCreateModel[] = [];

  constructor(
    private modalService: NgbModal,
    private challengeCreateService: ChallengeCreateService
  ) { }

  ngOnInit(): void {
    this.onGetAllChallenges();
  }

  onGetAllChallenges(){
    this.challengeCreateService.getAllChallenges().subscribe(
      (data) => {
        console.log(data);
        this.challengeCreateModel = data;
      },(error) => {

      }
    )
  }

  openModalCreateChallenge() {
    this.modalService.open(ChallengeCreateNewComponent, { size: 'lg', backdrop: 'static' });
  }

}
