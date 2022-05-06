import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service'


export interface ChallengeCreateModelI {
  id: number;
  challengeName: string;
  challengeDateCreate: string;
  selected: boolean;
  avalable: boolean;
  users: UsersModel;
  sudokus: Sudokus[];
}

export class ChallengeCreateModel implements ChallengeCreateModelI{

  constructor(
    public id: number,
    public challengeName: string,
    public challengeDateCreate: string,
    public selected: boolean,
    public avalable: boolean,
    public users: UsersModel,
    public sudokus: Sudokus[]
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

export class Sudokus{
  constructor(
    public id: number,
    public name: string,
    public niveau: string,
    public modifie: boolean,
    public value: number[],
    public solution: number,
    public isPressed: boolean,
    public player: string
  ){}
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



  static challenge: ChallengeCreateModel;

 

  constructor(private ws:WebsocketService) {

  }
}
