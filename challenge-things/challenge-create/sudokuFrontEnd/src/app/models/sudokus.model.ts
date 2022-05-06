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
