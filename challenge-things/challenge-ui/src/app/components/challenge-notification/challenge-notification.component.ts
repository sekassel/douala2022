import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/services/communication.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-challenge-notification',
  templateUrl: './challenge-notification.component.html',
  styleUrls: ['./challenge-notification.component.scss']
})
export class ChallengeNotificationComponent implements OnInit {

  title = 'challenge-ui';
  dataIsAllow = false;
  

   // New props
   challenges: Array<object> = [];
   sudokus: Array<object> = [];


  constructor(
    public dialog: MatDialog,
    private communicationService: CommunicationService,
    private ws: WebsocketService,
    private router: Router
  ) {

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
            this.sudokus = json.payload;
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
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: this.challenges,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      CommunicationService.challenge = result;
      this.router.navigate(['/details']);
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

  // sendMsg(event:EventDTO) {
  //   this.ws.events.next(event);
  // }
}
