import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monitor-started-frontend';

  events:any[] = [];
  users:any[] = [];

  constructor(private ws: WebsocketService) {
    this.ws.events.subscribe(msg => {
      const str = `${msg}`;

      if(str.startsWith('{')) {
        const json = JSON.parse(str);
        const topic = json.topic;

        switch(topic) {
          case "events-listed": 
            // Use of array.filter to get only these team's events ?
            this.events = json.payload; 
            break;
          case "challenge-created": 
            this.events.push(json.payload); 
            break;
          case "challenge-sudokus-listed":
            // Use of array.filter to get only its sudokus
            // this.sudokus = json.payload;
            break;
        }
      }
      console.log("Response from websocket: " + msg);
    });

    setTimeout(() => { // Important !
      // this.subscribeToEvents();
    },1000);
  }
  
}
