import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'monitor-started-frontend';

  events:any[] = []
  users:any[] = [];
  topicList = [''];

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
      this.topicList = this.getUnique(this.events);
      console.log(this.topicList);
    });

 /*    setTimeout(() => { // Important !
      this.subscribeToEvents();
    },1000); */
  
   
    toString()

    // ws.connect('http://localhost:3333/');
  }
  ngOnInit(): void {
    this.subscribeToEvents();
  }
  
  subscribeToEvents() {

    // this.http.get("http://localhost:3333/topicM").subscribe(
    this.http.get("https://event-broker-douala2022.herokuapp.com/topicM").subscribe(
      (res:any)=>{
        
        this.events=res
        console.log("response",this.events)

      },
      (error)=>{
        console.log(error)
      }
      
    )
    console.log("hon init",this.events)

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

  toJson(object: any): string {
    return JSON.stringify(object, null, 3);
  }

  getUnique(events: any) {
    const topicNames = [];
    const topicNamesFilter = [];
    for(const event of events){
      for(const id of event){
        topicNames.push(id.topic);
      }
    }

    for(let i=0; i < topicNames.length; i++){
      if(topicNamesFilter.indexOf(topicNames[i]) === -1) {
        topicNamesFilter.push(topicNames[i]);
      }
    }
    return topicNamesFilter;
  }

}
