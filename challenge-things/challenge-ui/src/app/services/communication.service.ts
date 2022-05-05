import { Injectable } from '@angular/core';


export interface ChallengeData {
  challengeName: string;
  date: string;
  new: boolean;
  accpeted: boolean;
  sudokus: SudokuSchema[];
}

export interface SudokuSchema{
  name: string;
  player: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {
  static challenge: ChallengeData = {
    challengeName: "",
    date: "",
    new: false,
    accpeted: false,
    sudokus: []
  };

  sudokuData = [
    {
      name: "sudoku 1",
      player: "Eric",
      status: ""
    },
    {
      name: "sudoku 2",
      player: "Albert",
      status: ""
    },
    {
      name: "sudoku 3",
      player: "Franck",
      status: ""
    },
    {
      name: "sudoku 4",
      player: "Armelle",
      status: ""
    }
  ]

  dataSend = [
    {
      challengeName: "name1",
      date: "21 may 2022",
      new: true,
      accpeted: false,
      sudokus: this.sudokuData
    },
    {
      challengeName: "name2",
      date: "21 may 2022",
      new: true,
      accpeted: false,
      sudokus: this.sudokuData
    },
    {
      challengeName: "name3",
      date: "21 may 2022",
      new: true,
      accpeted: false,
      sudokus: this.sudokuData
    }
  ]

  constructor() { }
}
