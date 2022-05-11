import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChallengeCreateModel, CommunicationService} from 'src/app/services/communication.service';
import { WebsocketService } from 'src/app/services/websocket.service';






@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {

  // challenges: ChallengeData[] = [
  //   {
  //     challengeName: "name1",
  //     date: "21 may 2022",
  //     new: true,
  //     accpeted: false,
  //     sudokus: []
  //   }
  // ];

  challenges: ChallengeCreateModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public communication: CommunicationService,
    private ws: WebsocketService) {

      this.ws.events.subscribe(msg => {
        // this.challenges.push(msg);
        const str = `${msg}`;

        if(str.startsWith('{')) {
          const json = JSON.parse(str);
          const topic = json.topic;

          switch(topic) {
            case "challenges-listed":
              // Use of array.filter to get only these team's challenges ?
              this.challenges = json.payload;
              break;
            case "challenge-created":
              this.challenges.push(json.payload);
              break;
            case "challenge-sudokus-listed":
              // Use of array.filter to get only its sudokus
              // this.sudokus = json.payload;
              break;
          }
        }
        console.log("Response from websocket: " + msg);
      });

      setTimeout(() => { // Important !
        this.subscribeToEvents();
        // this.started();
      },1000);

      setInterval(() => {

        this.ws.events.next(
          {
            topic: "publish",
            targetTopic: "challenges-listed",
            payload: this.challenges
          }
        );
  
      }, 2000);

     }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onAcceptChallenge(challenge:ChallengeCreateModel): void {
    challenge.avalable = false;
    challenge.selected = true;
    this.ws.events.next({
      topic: "publish",
      targetTopic: "challenge-accepted",
      payload: challenge
    })
    // Move to another modal to show available "sudokus"
    // that user can select.
  }

  goToTheDetails(challenge:ChallengeCreateModel): void {
    this.dialogRef.close(challenge);
  }

  onDeclineChallenge(challenge:ChallengeCreateModel): void {
    const answer = confirm(`Do you really want to decline this challenge ?`);
    if(answer){
      challenge.avalable = false;
      challenge.selected = false;
      this.ws.events.next({
        topic: "publish",
        targetTopic: "challenge-declined",
        payload: challenge
      })
    }

    // API request: delete the challenge and go back to the referrer
    // (the link the user comes from)
    // Need a query param for that.
  }


  // started(){
  //   const date = new Date();
  //   const current_date = date.getTime();
  //   for(let challenge of this.challenges){
  //     if(challenge.date == current_date){
  //       challenge.started = true;
  //     }
  //   }
  // }

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
      targetTopic: 'challenges-listed'
    });

    this.ws.events.next({
      topic: 'subscribe',
      targetTopic: 'challenge-created'
    });

    this.ws.events.next({
      topic: 'subscribe',
      targetTopic: 'challenge-sudokus-list'
    });
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
      targetTopic: 'challenge-declined'
    });

    this.ws.events.next({
      topic: 'publish',
      targetTopic: 'challenge-accepted'
    });
  }
}
