

import { assert } from 'console'
import {Websocket, WebsocketBuilder} from 'websocket-ts';


var ws : Websocket | null = null
var messageList : string[] = []

describe('the event broker client', () => {


    it('opens a websocket', () => {

        console.log('trying to open a websocket ' + JSON.stringify(ws));
        ws = new WebsocketBuilder('ws://localhost:3333')
        .onOpen((i, ev) => {
            console.log("yes the socket is opened")
            messageList.push("yes the socket is opened")
            // ws?.send("I have just opened you")
         })
        .onClose((i, ev) => { console.log("closed") })
        .onError((i, ev) => { console.log("error") })
        .onMessage((i, ev) => {
            console.log("we got a message " + JSON.stringify(ev.data, null, 3))
            messageList.push(`onMessage added to list \n ` +     JSON.stringify(ev.data, null, 3))
        })
        .onRetry((i, ev) => { console.log("retry") })
        .build();

        console.log(`ws is now open`)
    })

    it('checks for messages', () => {
        cy.log(JSON.stringify(messageList, null, 3))
        messageList = []
    })

    it('sends a message', ()=>{
        ws?.send('hello can i send you some events?');
        cy.wait(1000)
    })

    it('checks for response', () => {
        cy.log(JSON.stringify(messageList, null, 3))
        expect(messageList.length).gt(0)
        messageList = []
    })

    it('subsribes for user created', ()=>{
        const msg = {
            topic: 'subscribe',
            targetTopic: 'user-created'
        }
        ws?.send(JSON.stringify(msg, null, 3));
        cy.wait(1000);

        cy.log(`list of messages \n ` + JSON.stringify(messageList, null, 3))
    })


    it('publish for user created', ()=>{
        const msg = {
            topic: 'publish',
            targetTopic: 'user-created',
            payload: {
                userName: 'Alice',
                token: '12345621'
            }
        }
        ws?.send(JSON.stringify(msg, null, 3));
        cy.wait(1000);

        cy.log(`list of messages \n ` + JSON.stringify(messageList, null, 3))
    })


})