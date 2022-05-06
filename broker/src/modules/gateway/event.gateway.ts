import { Logger } from '@nestjs/common';
import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
import { Socket } from 'dgram';
  import { Server } from 'socket.io';
   
  @WebSocketGateway(4001)
  export class EventsGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect {


    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log('server connected')
      // throw new Error('Method not implemented.');
    }


    handleDisconnect(client: Socket) {
      this.logger.log('server disconnect')
      // throw new Error('Method not implemented.');
    }

    afterInit(server: Server) {
      this.logger.log('server initialized')
    }
   

    private logger= new Logger('EventsGateway')

  
    @WebSocketServer()
    server: Server;
   // Boardcast message to all connected clients
    // server.emit('patientList', activeUsers.map(x=> x.userName));  
   
    @SubscribeMessage('eventsToServer')
    handleEvent(client:Socket,data: string): void {

      this.server.emit('eventsToClient',data)
      // console.log(data)
        // return {event: 'message',data:'helloworl'};
    }
  }