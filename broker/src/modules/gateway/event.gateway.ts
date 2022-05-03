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
    handleConnection(client: any) {
      client.emit('connection','successfully connected to server')  
    }
    @WebSocketServer()
    server: Server;
   // Boardcast message to all connected clients
    // server.emit('patientList', activeUsers.map(x=> x.userName));  
   
    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
        return data;
    }
  }