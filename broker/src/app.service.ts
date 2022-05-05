import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, this is the Douala2022 Event Broker. Please connect to my websocket';
  }
}
