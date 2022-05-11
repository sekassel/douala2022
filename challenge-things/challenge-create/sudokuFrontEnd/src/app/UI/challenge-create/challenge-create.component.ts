import { Component, OnInit } from '@angular/core';
import { ChallengeCreateNewComponent } from './challenge-create-new.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChallengeCreateService} from "../service/challenge-create.service";
import {ChallengeCreateModel} from "../../models/challenge-create.model";
import {WebsocketService} from "../service/websocket.service";
import {Subscription} from "rxjs";
import {EventManager} from "../service/event-manager.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-challenge-create',
  templateUrl: './challenge-create.component.html',
  styleUrls: ['./challenge-create.component.scss']
})
export class ChallengeCreateComponent implements OnInit {

  challengeCreateModel: ChallengeCreateModel[] = [];
  challengeCreateModelDeclined: ChallengeCreateModel[] = [];

  challengeListSubscription?: Subscription;

  constructor(
    private modalService: NgbModal,
    private challengeCreateService: ChallengeCreateService,
    private ws: WebsocketService,
    private eventManager: EventManager,
    private toastr: ToastrService,
  ) {

    this.ws.events.subscribe(msg => {
      const str = `${msg}`;

      if(str.startsWith('{')) {
        const json = JSON.parse(str);
        const topic = json.topic;

        switch(topic) {
          case "challenge-accepted":
            console.log(json.payload)
            this.challengeCreateModelDeclined.push(json.payload);
            console.log(this.challengeCreateModelDeclined)
            this.onUpdateChallenge();
            break;
          case "challenge-declined":
            console.log(json.payload)
            this.challengeCreateModelDeclined.push(json.payload);
            console.log(this.challengeCreateModelDeclined)
            this.onUpdateChallenge();
            break;
        }
      }
      console.log("Response from websocket: " + msg);
    });

    setTimeout(() => { // Important !
      this.subscribeToEvents();
    },1000);

    setInterval(() => {

      this.ws.events.next(
        {
          topic: "publish",
          targetTopic: "challenges-listed",
          payload: this.challengeCreateModel
        }
      );

    }, 2000);

  }

  ngOnInit(): void {
    this.onGetAllChallenges();
    this.challengeListSubscription = this.eventManager.subscribe('challengeListModification', () => this.onGetAllChallenges());
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

  onDeletedChallenge(challengeCreateModel: ChallengeCreateModel){

    const answer = confirm(`Do you really want to delete this challenge ?`);
    if(answer){
      this.challengeCreateService.deleteChallenges(challengeCreateModel).subscribe(
        (res: any) => {
          this.eventManager.broadcast({ name: 'challengeListModification', content: 'challenge deleted' });
          this.toastr.success("Challenge delete");
        }, (error) => {
          this.toastr.error(error);
        }
      )
    }

  }

  onUpdateChallenge(){

    for (let i = 0; this.challengeCreateModelDeclined.length; i++) {

      this.challengeCreateService.updateChallenge(this.challengeCreateModelDeclined[i]).subscribe(
        (res: any) => {
          this.eventManager.broadcast({ name: 'challengeListModification', content: 'challenge update' });
        }, (error) => {
          this.toastr.error(error);
        }
      )

    }
    alert("Success Update");

  }

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

  subscribeToEvents() {
    /**
     * We need to subscribe to those events:
     * 'challenges-list'
     * 'challenge-created' ?
     * 'challenge-accepted' ?
     * 'challenge-declined' ?
     * 'challenge-sudokus-list'
     */
    this.ws.events.next({
      topic: 'subscribe',
      targetTopic: 'challenge-accepted'
    });

    this.ws.events.next({
      topic: 'subscribe',
      targetTopic: 'challenge-declined'
    });
  }

}
