import { Component, OnInit } from '@angular/core';
import { ChallengeCreateNewComponent } from './challenge-create-new.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChallengeCreateService} from "../service/challenge-create.service";
import {ChallengeCreateModel} from "../../models/challenge-create.model";
import {map} from "rxjs/operators";
import {WebsocketService} from "../service/websocket.service";

@Component({
  selector: 'app-challenge-create',
  templateUrl: './challenge-create.component.html',
  styleUrls: ['./challenge-create.component.scss']
})
export class ChallengeCreateComponent implements OnInit {

  challengeCreateModel: ChallengeCreateModel[] = [];

  constructor(
    private modalService: NgbModal,
    private challengeCreateService: ChallengeCreateService,
    private ws: WebsocketService
  ) {

    setTimeout(() => { // Important !
      this.ws.events.subscribe(msg => {
        const str = `${msg}`;

        if(str.startsWith('{')) {
          const json = JSON.parse(str);
          const topic = json.topic;

          switch(topic) {
            case "challenges-listed":
              // Use of array.filter to get only these team's challenges ?
              this.challengeCreateModel = json.payload;
              break;
            case "challenge-created":
              this.challengeCreateModel.push(json.payload);
              break;
            case "challenge-sudokus-listed":
              break;
          }
        }
        console.log("Response from websocket: " + msg);
      });


    },1000);

    setInterval(() => {

      this.ws.events.next(
        {
          topic: "publish",
          targetTopic: "challenges-listed",
          payload: this.challengeCreateModel
        }
      );

    }, 1000);

  }

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

  // onGetAllChallenges(){
  //   this.challengeCreateService.getAllChallenges().pipe(
  //     map((data) => {} )
  //   )
  // }

  openModalCreateChallenge() {
    this.modalService.open(ChallengeCreateNewComponent, { size: 'lg', backdrop: 'static' });
  }

  publishToEvents() {
    /**
     * We need to publish to those events:
     * 'challenges-list'
     * 'challenge-created' ?
     * 'challenge-accepted' ?
     * 'challenge-declined' ?
     * 'challenge-sudokus-list'
     */
    this.ws.events.next({
      topic: 'publish',
      targetTopic: 'challenges-listed'
    });

    this.ws.events.next({
      topic: 'publish',
      targetTopic: 'challenge-created'
    });

    this.ws.events.next({
      topic: 'publish',
      targetTopic: 'challenge-sudokus-list'
    });
  }

}
