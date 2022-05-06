

import {Websocket, WebsocketBuilder} from 'websocket-ts';
const date = new Date();


var ws : Websocket | null = null

describe('the event broker client', () => {


    it('opens a websocket', () => {

        console.log('trying to open a websocket ' + JSON.stringify(ws));
        ws = new WebsocketBuilder('ws://localhost:3333')
        .onOpen((i, ev) => {
            console.log("yes the socket is opened")
            ws?.send("I have just opened you")
         })
        .onClose((i, ev) => { console.log("closed") })
        .onError((i, ev) => { console.log("error") })
        .onMessage((i, ev) => { console.log("we got a message " + JSON.stringify(ev, null, 3)) })
        .onRetry((i, ev) => { console.log("retry") })
        .build();

        console.log(`ws is now: ${JSON.stringify(ws, null, 3)}`)

        cy.wait(1000)

        cy.log(`ws is now: ${JSON.stringify(ws, null, 3)}`)



    })

    it('sends a message', ()=>{
        ws?.send('hello can i send you some events?');
        cy.wait(1000)
    })

    it('subsribes for user created', ()=>{
        const msg = {
            topic: 'subscribe',
            targetTopic: 'user-created'
        }
        ws?.send(JSON.stringify(msg, null, 3));
        cy.wait(1000);
    })


    it('publish for user created', ()=>{
        const msg = {
            topic: 'publish',
            targetTopic: 'user-created',
            payload: {
                userName: 'Alice',
                token: '12345621',
                time: date.toISOString()
            }
        }
        ws?.send(JSON.stringify(msg, null, 3));
        cy.wait(1000);
    })


})