import { Injectable } from '@angular/core';


export interface ChallengeData {
  challengeName: string;
  date: string;
  new: boolean;
  accpeted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  challenge?: ChallengeData

  sudokuData = [
    {
      name: "sudoku 1",
      player: "Eric",
      status: ""
    }
  ]

  dataSend = [
    {
      challengeName: "name1",
      date: "21 may 2022",
      new: true,
      accpeted: false
    },
    {
      challengeName: "name2",
      date: "21 may 2022",
      new: true,
      accpeted: false
    },
    {
      challengeName: "name3",
      date: "21 may 2022",
      new: true,
      accpeted: false
    }
  ]

  constructor() { }
}
