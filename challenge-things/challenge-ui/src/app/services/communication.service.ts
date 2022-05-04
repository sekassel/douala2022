import { Injectable } from '@angular/core';


export interface ChallengeData {
  challengeName: string;
  date: string;
  new: boolean;
  accpeted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  challenge?: ChallengeData

  constructor() { }
}
