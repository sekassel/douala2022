import { Component } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public publisher: Item = {
    topic: '',
    payload: []
  };
  public line: number = 0;
  public result: any;
  public sudokuGrid: number[][] = [[]];
  public row: number[]=[];
  
  
  validateRow(userInput: number[]):boolean{
    if((userInput.length == 3) && (userInput.find(elt => (elt==0 || elt >9)) == undefined)){
      return userInput.length !== new Set(userInput).size? false : true ;
    }else{
      return false;
    }
  }

  getRow(rowValues: string){
    this.row = rowValues.split(',').map(elt => Number(elt));
    if(this.validateRow(this.row)){
      this.sudokuGrid[this.line] = this.row;
      (this.line >= 2)? this.setRow("solution entered") : this.line++;
    }else{
      console.log("the input you entered is not correct")
    }
    
  }
   checkGame():boolean{
    let found: number = 0; 
    let cnt: number = 0;
    this.sudokuGrid.forEach(elt => elt.forEach(e =>{
      cnt++;
      e < 0? found++ : found;}));
    console.log(found)
    console.log(cnt);
    return found > 0 && cnt == 9? true : false;
   }
  setRow(msg: string){
    this.line = 0
    this.checkGame()? this.publish(msg): console.log("add some hidden numbers to the game");
    
  }
  publish(msg: string){
    this.publisher.topic = msg;
    this.publisher.payload = this.sudokuGrid;

    console.log(this.publisher);
  }
}
