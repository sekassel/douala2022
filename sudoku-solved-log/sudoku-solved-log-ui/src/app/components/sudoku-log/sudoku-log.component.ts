import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { WebsocketService } from 'src/app/services/websocket.service';
import { WebSocketServer, WebSocket } from 'ws';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sudoku-log',
  templateUrl: './sudoku-log.component.html',
  styleUrls: ['./sudoku-log.component.scss'],
  providers: [NgbAccordionConfig]
})
export class SudokuLogComponent implements OnInit {


  challengeStarter = {
    "challengeId": "9a152c01-5805-4489-a8fb-a5ee45ba01af",
    "challengeName": "Koogle",
    "teams": [
      {
        "id": 0,
        "startDate": "2022-05-12T01:27",
        "teamName": "Delia",
        "members": 5,
        "solvedSudokus": 2,
        "sudokus": 8
      },
      {
        "id": 1,
        "startDate": "2022-05-09T08:11",
        "teamName": "Gillespie",
        "members": 4,
        "solvedSudokus": 6,
        "sudokus": 8
      },
      {
        "id": 2,
        "startDate": "2022-05-13T12:10",
        "teamName": "Bessie",
        "members": 4,
        "solvedSudokus": 0,
        "sudokus": 8
      },
      {
        "id": 3,
        "startDate": "2022-05-30T02:19",
        "teamName": "Isabelle",
        "members": 5,
        "solvedSudokus": 3,
        "sudokus": 8
      },
      {
        "id": 4,
        "startDate": "2022-05-24T01:32",
        "teamName": "Kris",
        "members": 2,
        "solvedSudokus": 0,
        "sudokus": 8
      },
      {
        "id": 5,
        "startDate": "2022-05-17T09:05",
        "teamName": "Walters",
        "members": 3,
        "solvedSudokus": 5,
        "sudokus": 8
      },
      {
        "id": 6,
        "startDate": "2022-05-25T08:29",
        "teamName": "Berry",
        "members": 4,
        "solvedSudokus": 5,
        "sudokus": 8
      },
      {
        "id": 7,
        "startDate": "2022-05-19T03:10",
        "teamName": "Leigh",
        "members": 3,
        "solvedSudokus": 7,
        "sudokus": 8
      },
      {
        "id": 8,
        "startDate": "2022-05-14T01:03",
        "teamName": "Potts",
        "members": 5,
        "solvedSudokus": 1,
        "sudokus": 8
      },
      {
        "id": 9,
        "startDate": "2022-05-15T07:42",
        "teamName": "Nikki",
        "members": 5,
        "solvedSudokus": 1,
        "sudokus": 8
      }
    ]
  }
  data_: any;


  constructor(
    config: NgbAccordionConfig,
    private wsService: WebsocketService,
    private http: HttpClient
  ) {
    config.closeOthers = true;
    config.type = 'info';


    // this.wsService.messages
    //   .subscribe(
    //   data => {
    //     this.subsribeToChallengeAccepted();

    //     const jsonData = `${data}`;
    //     console.log('---------' +jsonData)
    //     if (jsonData.startsWith('{')) {
    //       const json = JSON.parse(jsonData);
    //       const topic = json.targetTopic;

    //       if (topic) {
    //         this.data_ = json.payload;
    //         console.log(JSON.stringify(this.data_, null, 3));
    //       }
    //     };

    //     console.log("Response from websocket: " + data);
    //   },
    //   err => console.log({error: 'Subscription error!!!!!'})
    // );

    // setTimeout(() => { // Important !
    //   this.subsribeToChallengeAccepted();
    // },1000);


  }

  async ngOnInit() {
    await this.http.get(environment.brokerUrl + '/topic?id=challenge-accepted')
      .subscribe(
        challenge => {
          console.log(JSON.stringify(challenge, null, 3));
          this.data_ = challenge;
        },
        error => console.log({Error: error})
      );


  }

  subsribeToChallengeAccepted() {
    this.wsService.messages.next({
      topic: 'subscribe',
      targetTopic: 'challenge-accepted'
    })
  }

}
