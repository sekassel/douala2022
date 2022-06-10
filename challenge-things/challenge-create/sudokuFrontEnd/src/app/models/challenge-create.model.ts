import {UsersModel} from "./users.model";


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

export interface ChallengeCreateModelI {
  id: number;
  challengeName: string;
  challengeDateCreate: string | null;
  selected: boolean;
  started: boolean;
  avalable: boolean;
  users: UsersModel;
  sudokus: Sudokus[];
}

export class ChallengeCreateModel implements ChallengeCreateModelI{

  constructor(
    public id: number,
    public challengeName: string,
    public challengeDateCreate: string | null,
    public selected: boolean,
    public started: boolean,
    public avalable: boolean,
    public users: UsersModel,
    public sudokus: Sudokus[]
  ){}

}
