import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class BuilderService implements OnModuleInit {

    
    onModuleInit() {
        throw new Error("Method not implemented.");
    }
}