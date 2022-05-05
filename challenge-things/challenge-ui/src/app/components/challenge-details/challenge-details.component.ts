import { Component, OnInit } from '@angular/core';
import { ChallengeData, CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.scss']
})
export class ChallengeDetailsComponent implements OnInit {
  
  dataChallenge: ChallengeData;

  constructor(
    private communicationService: CommunicationService
  ) { 
    this.dataChallenge = CommunicationService.challenge;
  }

  ngOnInit(): void {
  }

}
