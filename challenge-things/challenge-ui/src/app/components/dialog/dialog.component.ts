import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChallengeData } from 'src/app/services/communication.service';






@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public challenges: ChallengeData[]) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAcceptChallenge(challenge:ChallengeData): void {
    challenge.new = false;
    challenge.accpeted = true;
    // Move to another modal to show available "sudokus"
    // that user can select. 
  }

  goToTheDetails(challenge:ChallengeData): void {
    this.dialogRef.close(challenge);
  }

  onDeclineChallenge(challenge:ChallengeData): void {
    const answer = confirm(`Do you really want to decline this challenge ?`);
    if(answer){
      challenge.new = false;
    }
      
    // API request: delete the challenge and go back to the referrer
    // (the link the user comes from)
    // Need a query param for that.
  }
}
