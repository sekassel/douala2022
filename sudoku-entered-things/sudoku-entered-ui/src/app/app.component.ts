import { Component } from '@angular/core';
import { Item } from './item';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebsocketService]
})
export class AppComponent {
  public publisher: Item = {
    topic: 'publish',
    targetTopic: '',
    payload: []
  };
  public line: number = 0;
  public result: any;
  public sudokuGrid: number[][] = [[]];
  public row: number[]=[];
  sent: any;
 
  
  constructor(private WebsocketService: WebsocketService) {
    WebsocketService.messages.subscribe(msg => {
      const received = `${msg}`;
      if(received.startsWith('{')){
        
        const jsonRecieved = JSON.parse(received);
        const targetTopic = jsonRecieved.targetTopic;

        switch(targetTopic){
          case "sudoku-entered":
            console.log("Nice Job you get something");
            //get the payload
        }
      }
      console.log("Response from websocket: " + msg);
      return msg;
    });
    
  }

  receiveMsg(websocketService: WebsocketService){
    websocketService.messages.subscribe(msg => {
      const received = `${msg}`;
      if(received.startsWith('{')){
        
        const jsonRecieved = JSON.parse(received);
        const targetTopic = jsonRecieved.topic;

        switch(targetTopic){
          case "publish":
            console.log("Nice Job you get something here is topic");
            //get the payload
        }
      }
    });
  }

  sendMsg() {
    let message = {
      source: '',
      content: this.publisher
    };
    message.source = 'localhost';
    message.content = this.publisher;

    //this.sent.push(message);
    this.WebsocketService.messages.next(message);
  }


  validateRow(userInput: number[]):boolean{
    if((userInput.length == 9) && (userInput.find(elt => (elt==0 || elt >9)) == undefined)){
      return userInput.length !== new Set(userInput).size? false : true ;
    }else{
      return false;
    }
  }

  getRow(rowValues: string){
    this.row = rowValues.split(',').map(elt => Number(elt));
    if(this.validateRow(this.row)){
      this.sudokuGrid[this.line] = this.row;
      (this.line >= 8)? this.setRow("solution-entered") : this.line++;
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
    console.log(' %d Hidden numbers', found);
    console.log(' %d Entries found', cnt);
    return found > 0 && cnt == 81? true : false;
   }
  setRow(msg: string){
    this.line = 0
    this.checkGame()? this.publish(msg): console.log("add some hidden numbers to the game");
    
  }
  publish(msg: string){
    this.publisher.targetTopic = msg;
    this.publisher.payload = this.sudokuGrid;

    
    this.receiveMsg(this.WebsocketService);
    this.sendMsg();
    console.log(this.publisher);
  }
}
