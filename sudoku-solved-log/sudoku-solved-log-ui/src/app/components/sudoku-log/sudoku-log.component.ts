import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sudoku-log',
  templateUrl: './sudoku-log.component.html',
  styleUrls: ['./sudoku-log.component.scss'],
  providers: [NgbAccordionConfig]
})
export class SudokuLogComponent implements OnInit {


  challengeStarter = {
    "challengeId": "a4deb59f-7b25-4077-b645-0c7636be408d",
    "challengeName": "Tribalog",
    "teams": [
      {
        "id": 0,
        "startDate": "2022-05-16T08:01",
        "teamName": "Ida",
        "solvedSudokus": 4
      },
      {
        "id": 1,
        "startDate": "2022-05-13T08:22",
        "teamName": "Helga",
        "solvedSudokus": 1
      },
      {
        "id": 2,
        "startDate": "2022-05-19T09:11",
        "teamName": "Noble",
        "solvedSudokus": 2
      },
      {
        "id": 3,
        "startDate": "2022-05-10T05:43",
        "teamName": "Todd",
        "solvedSudokus": 1
      },
      {
        "id": 4,
        "startDate": "2022-05-21T01:06",
        "teamName": "Allen",
        "solvedSudokus": 2
      },
      {
        "id": 5,
        "startDate": "2022-05-19T03:27",
        "teamName": "Mariana",
        "solvedSudokus": 2
      },
      {
        "id": 6,
        "startDate": "2022-05-11T09:13",
        "teamName": "Holloway",
        "solvedSudokus": 8
      },
      {
        "id": 7,
        "startDate": "2022-05-16T12:09",
        "teamName": "Josefa",
        "solvedSudokus": 2
      },
      {
        "id": 8,
        "startDate": "2022-05-13T08:13",
        "teamName": "Baldwin",
        "solvedSudokus": 2
      },
      {
        "id": 9,
        "startDate": "2022-05-16T03:56",
        "teamName": "Hollie",
        "solvedSudokus": 7
      }
    ]
  };


  constructor(config: NgbAccordionConfig) { 
    config.closeOthers = true;
    config.type = 'info';
  }

  ngOnInit(): void {
  }

}
