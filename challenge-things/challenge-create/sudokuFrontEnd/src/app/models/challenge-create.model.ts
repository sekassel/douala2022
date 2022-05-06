import {UsersModel} from "./users.model";

export interface ChallengeCreateModelI {
  id: number;
  challengeName: string;
  challengeDateCreate: string | null;
  selected: boolean;
  avalable: boolean;
  users: UsersModel;
}

export class ChallengeCreateModel implements ChallengeCreateModelI{

  constructor(
    public id: number,
    public challengeName: string,
    public challengeDateCreate: string | null,
    public selected: boolean,
    public avalable: boolean,
    public users: UsersModel
  ){}

}
