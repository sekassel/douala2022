import {UsersModel} from "./users.model";
import {Sudokus} from "../../../../../challenge-ui/src/app/services/communication.service";

export interface ChallengeCreateModelI {
  id: number;
  challengeName: string;
  challengeDateCreate: string | null;
  selected: boolean;
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
    public avalable: boolean,
    public users: UsersModel,
    public sudokus: Sudokus[]
  ){}

}
