import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service'


export interface ChallengeCreateModelI {
  id: number;
  challengeName: string;
  challengeDateCreate: string;
  selected: boolean;
  avalable: boolean;
  users: UsersModel;
}

export class ChallengeCreateModel implements ChallengeCreateModelI{

  constructor(
    public id: number,
    public challengeName: string,
    public challengeDateCreate: string,
    public selected: boolean,
    public avalable: boolean,
    public users: UsersModel
  ){}

}


export interface UsersModelI {
  id: number;
  username: string;
  country: string;
  password: string;
}

export class UsersModel implements UsersModelI{
  constructor(
    public id: number,
    public username: string,
    public country: string,
    public password: string
  ){}
}



export interface ChallengeData {
  challengeName: string;
  date?: string;
  new?: boolean;
  accpeted?: boolean;
  sudokus?: SudokuSchema[];
}

export interface SudokuSchema{
  name: string;
  player: string;
  status: string;
}

export interface EventDTO {
  topic:string;
  targetTopic:string;
  payload?:any
}

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {

  static challenges: any=[];


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

  constructor(private ws:WebsocketService) {

  }
}
