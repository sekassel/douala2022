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
