import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
const wsList : WebSocket[] = []
const topicMap: Map<string, WebSocket[]> = new Map();

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);

        const msg : string = `${message}`

        if (msg.startsWith('{')) {
            console.log('trying to parse ' + msg);
            const jsonMsg = JSON.parse(msg);
            if (jsonMsg.topic == 'subscribe') {
                console.log('it is a subscribe for topic  ' + jsonMsg.targetTopic);
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
                ws.send(JSON.stringify(answer, null, 3))
            }
        }

        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 3333, () => {
    const port = server.address()
    console.log(`Server started on port ${JSON.stringify(server?.address())} :)`);
});