import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';


import bodyParser = require('body-parser')
import url = require('url');
import querystring = require('querystring');
import cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
const wsList : WebSocket[] = []
const topicMap: Map<string, WebSocket[]> = new Map();
const eventMap: Map<string, any[]> = new Map();


// let us have an post endpoint for publishing new events
app.post('/publish', (req, res) => {
    try {
        const jsonMsg = req.body;
        console.log('post publish got body ' + JSON.stringify(jsonMsg, null, 3))
        handlePublish(jsonMsg)
        res.send({
            msg: 'Thank you'
        })
    } catch (error) {
        res.send({
            err: error
        })
    }
})

app.post('/remove', (req, res) => {
    try {
        const jsonMsg = req.body;
        console.log('post remove got body ' + JSON.stringify(jsonMsg, null, 3))
        handleRemove(jsonMsg)
        res.send({
            msg: 'Okay'
        })
    } catch (error) {
        res.send({
            err: error
        })
    }
})

app.get('/topic', (req, res) => {
    try {

        let id = `${req.query.id}`

        let eventList = eventMap.get(id)
        // console.log(`eventlist for ${id} is ${JSON.stringify(eventList)}`)
        if ( ! eventList) {
            eventList = []
        }
        res.send(JSON.stringify(eventList, null, 3))
    } catch (error) {
        res.send({err: error})
    }
})


app.get('/topicM', (req, res) => {
    try {
        let eventList:any[]=[]
        let id = `${req.query.id}`
        for(let [key,value] of eventMap ){
            eventList.push(value)
        }

        console.log(eventList)
        res.send(JSON.stringify(eventList, null, 3))
    } catch (error) {
        res.send({err: error})
    }
})


app.get('/', (req, res) => {
    let eventList:any[]=[]
    for(let [key,value] of eventMap ){
        eventList.push(value)
    }
    res.send({
        msg: 'Welcome to the Douala2022 Event Broker.',
        eventMap: eventList
    })
})


wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        try {
            //log the received message and send it back to the client
            // console.log('received: %s', message);

            const msg : string = `${message}`

            if (msg.startsWith('{')) {
                const jsonMsg = JSON.parse(msg);
                handleSubscribe(ws, jsonMsg)
                handlePublish(jsonMsg)
                handleRemove(jsonMsg)
                handleMonitor(ws, jsonMsg)
                return
            }

            ws.send(`Hello, you sent -> ${message}`);
        } catch (error) {
            ws.send("ws ups " + error)
        }
    });

    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 3333, () => {
    const port = server.address()
    console.log(`Server started on port ${JSON.stringify(server?.address())} :)`);
});


function handleSubscribe(ws: WebSocket, jsonMsg: any) {

    if (jsonMsg.topic == 'subscribe') {
        // console.log('it is a subscribe for topic  ' + jsonMsg.targetTopic);
        const tgtTopic = jsonMsg.targetTopic;
        var subscribers = topicMap.get(tgtTopic);
        if (subscribers == null) {
            subscribers = [];
            topicMap.set(tgtTopic, subscribers)
        }
        subscribers.push(ws);
        const answer = {
            state: 'success',
            originalMessage: jsonMsg
        }
        const text = JSON.stringify(answer, null, 3)
        ws.send(text)
        // console.log('reply to subscribe has been  \n' + text);
        return
    }
}

function handleMonitor(ws: WebSocket, jsonMsg:any) {
    if(jsonMsg.topic == 'monitor') {
        const object = {};

        eventMap.forEach((value, key) => {
            const keys = key.split('.'),
                last:any = keys.pop();
            keys.reduce((r:any, a:any) => r[a] = r[a] || {}, object)[last] = value;
        });

        ws.send(JSON.stringify(object), ()=>{})
    }
}

function handlePublish(jsonMsg: any) {
    if (jsonMsg.topic == 'publish') {
        // console.log('it is a publish for topic  ' + jsonMsg.targetTopic);
        const tgtTopic = jsonMsg.targetTopic;

        if ( ! jsonMsg.time) {
            jsonMsg.time = new Date().toISOString()
        }

        // store in eventMap
        const answer = {
            topic: tgtTopic,
            time: jsonMsg.time,
            payload: jsonMsg.payload
        }
        var eventList = eventMap.get(answer.topic);
        if ( ! eventList) {
            eventList = []
            eventMap.set(answer.topic, eventList)
        }
        if ( newEvent(answer, eventList)){
            eventList.push(answer)
        }


        console.log(`eventlist for ${jsonMsg.targetTopic} is ${JSON.stringify(eventList, null, 3)}`)
        console.log(`    ...  the size is : ${eventList.length}`)


        // find interested sockets
        const socketList = topicMap.get(jsonMsg.targetTopic)
        if (socketList == null) {
            // console.log("socket list for this topic is empty")
            return
        }

        // send the message
        const text = JSON.stringify(answer, null, 3)

        // send to subscribers
        for (const s of socketList) {
            s.send(text, (err) => {
                if (err) {
                    const errString = JSON.stringify(err)
                    if (errString != '{}') {
                        console.log(`send error ` + JSON.stringify(err))
                    }
                }
            })
            console.log('have send answer to some service');
        }

        // Send to the monitor
        // const monitorSocket = topicMap.get('any');
        // if(monitorSocket) {
        //     monitorSocket[0].send(text, (err) => {
        //         if (err) {
        //             const errString = JSON.stringify(err)
        //             if (errString != '{}') {
        //                 console.log(`send error ` + JSON.stringify(err))
        //             }
        //         }
        //     });
        // }

        return
    }
}

function handleRemove(jsonMsg: any) {
    if (jsonMsg.topic == 'remove') {
        // console.log('it is a publish for topic  ' + jsonMsg.targetTopic);
        const tgtTopic = jsonMsg.targetTopic;

        // remove from eventMap
        var eventList = eventMap.get(tgtTopic);
        if ( ! eventList) {
            return
        }

        var i = 0
        for (const e of eventList) {
            if (e.time === jsonMsg.time) {
                eventList.splice(i, 1)
                console.log('list after removal ' + JSON.stringify(eventList))
            }
            i++;
        }

        // find interested sockets
        const socketList = topicMap.get(jsonMsg.targetTopic)
        if (socketList == null) {
            // console.log("socket list for this topic is empty")
            return
        }

        // inform subscribers
        const text = JSON.stringify(jsonMsg, null, 3)

        // send to subscribers
        for (const s of socketList) {
            s.send(text, (err) => {
                if (err) {
                    const errString = JSON.stringify(err)
                    if (errString != '{}') {
                        console.log(`send error ` + JSON.stringify(err))
                    }
                }
            })
            console.log('have send answer to some service');
        }

        return
    }
}


function newEvent(event:any, list:any[]){
     const newEventText = JSON.stringify(event)
     for (const oldEvent of list) {
         const oldEventText = JSON.stringify(oldEvent)
         if (newEventText === oldEventText) {
             console.log('this event is already known')
             return false
         }
     }
     return true
 }