import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monitor-started-frontend';
  eventsList = ['publish', 'subscribe', 'users created'];

  events:any;
  users:any[] = [];

  constructor(private ws: WebsocketService,private http: HttpClient) {
    this.ws.events.subscribe(msg => {
      const str = `${msg}`;

      if(str.startsWith('{')) {
        const json = JSON.parse(str);
        const topic = json.topic;
        this.events = json.payload

        // switch(topic) {
        //   case "users": 
        //     // Use of array.filter to get only these team's events ?
        //     this.events = json.payload; 
        //     break;
        //   case "challenge-created": 
        //     this.events.push(json.payload); 
        //     console.log(this.events);
        //     break;
        //   case "challenge-sudokus-listed":
        //     // Use of array.filter to get only its sudokus
        //     // this.sudokus = json.payload;
        //     break;
        // }
      }
      console.log("Response from websocket: " + msg);
    });

    setTimeout(() => { // Important !
      this.subscribeToEvents();
    },1000);
  

    // ws.connect('http://localhost:3333/');
  }
  
  subscribeToEvents() {

    this.http.get("http://localhost:3333/topicM").subscribe(
      (res)=>{
        console.log(res)
        this.events=res

      },
      (error)=>{
        console.log(error)
      }
      
    )
    /**
     * We need to subscribe to those events:
     * 'challenges-list'
     * 'challenge-created' ?
     * 'challenge-accepted' ?
     * 'challenge-declined' ?
     * 'challenge-sudokus-list'
     */
    // this.ws.events.next({
    //   topic: 'monitor',
    //   targetTopic: 'any'
    // });

    // this.ws.events.next({
    //   topic: 'subscribe',
    //   targetTopic: 'challenge-created'
    // });

    // this.ws.events.next({
    //   topic: 'subscribe',
    //   targetTopic: 'challenge-sudokus-list'
    // });
  }
}
