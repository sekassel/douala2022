import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChallengeCreateModel, ChallengeData, CommunicationService} from 'src/app/services/communication.service';
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
      },1000);

     }

  ngOnInit(): void {
    this.challenges = CommunicationService.challenges;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAcceptChallenge(challenge:ChallengeData): void {
    challenge.new = false;
    challenge.accpeted = true;
    // Move to another modal to show available "sudokus"
    // that user can select.
  }

  goToTheDetails(challenge:ChallengeData): void {
    this.dialogRef.close(challenge);
  }

  onDeclineChallenge(challenge:ChallengeData): void {
    const answer = confirm(`Do you really want to decline this challenge ?`);
    if(answer){
      challenge.new = false;
    }

    // API request: delete the challenge and go back to the referrer
    // (the link the user comes from)
    // Need a query param for that.
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
}
