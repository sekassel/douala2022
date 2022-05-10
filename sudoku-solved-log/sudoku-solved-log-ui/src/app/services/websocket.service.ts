// import { Injectable } from '@angular/core';
// import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
// import { catchError, tap, switchAll } from 'rxjs/operators';
// import { EMPTY, Observable, Subject } from 'rxjs';
// import { environment } from 'src/environments/environment';

// export const WS_ENDPOINT = environment.wsBrokerUrl;
// // import { } from '';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketService {
//   public socket$ = webSocket(WS_ENDPOINT);
//   private messagesSubject$ = new Subject<any>(); 
//   public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

//   constructor() { }

//   public connect(): void {
  
//     if (!this.socket$ || this.socket$.closed) {
//       this.socket$ = this.getNewWebSocket();
//       const messages = this.socket$.pipe(
//         tap({
//           error: error => console.log(error),
//         }), catchError(_ => EMPTY));
//       this.messagesSubject$.next(messages);
//     }
//   }

//   getNewWebSocket() {
//     return webSocket({
//       url: WS_ENDPOINT,
//       closeObserver: {
//         next: () => {
//           console.log('[WebsocketService]: connection closed');
//         }
//       },
//     });
//   }
  
//   sendMessage(msg: any) {
//     this.socket$.next(msg);
//   }

//   close() {
//     this.socket$.complete(); 
//   }


// }


import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";

const CHAT_URL = environment.wsBrokerUrl;

export interface Message {
    topic: string;
    targetTopic: string;
    payload?: any
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
    private subject!: AnonymousSubject<MessageEvent>;
    public events!: Subject<object>;

    constructor() {
        this.events = <Subject<object>>this.connect(CHAT_URL).pipe(
            map(
                (response: MessageEvent): Message => {
                    console.log(response.data);
                    // let data = JSON.parse(response.data)
                    // return console.data;
                    return response.data;
                }
            )
        );
    }

    public connect(url:string): AnonymousSubject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    }

    private create(url:string): AnonymousSubject<MessageEvent> {
        let ws = new WebSocket(url);

        let observable = new Observable((obs: Observer<MessageEvent>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });

        let observer = {
            error: (err:any) => { console.log(err); },
            complete: () => {},
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                    console.log('Message sent to websocket: ', data);
                }
            }
        };
        return new AnonymousSubject<MessageEvent>(observer, observable);
    }
}

