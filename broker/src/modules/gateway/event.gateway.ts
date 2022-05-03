import { Logger } from '@nestjs/common';
import {
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
   
  @WebSocketGateway(4001)
  export class EventsGateway implements OnGatewayConnection {

    private logger= new Logger('EventsGateway')

    handleConnection(client: any) {
      this.logger.log('new client')
      client.emit('connection','successfully connected to server')  
    }
    @WebSocketServer()
    server: Server;
   // Boardcast message to all connected clients
    // server.emit('patientList', activeUsers.map(x=> x.userName));  
   
    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
      console.log(data)
        return data;
    }
  }