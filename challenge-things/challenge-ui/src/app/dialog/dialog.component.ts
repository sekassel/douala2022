import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



export interface DialogData {
  challengeName: string;
  date: string;
}



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: DialogData[]) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAcceptChallenge(challengeId:number): void {
    alert(`Hey folks ! Challenge ${challengeId} accepted :) !`);
    // Move to another modal to show available "sudokus"
    // that user can select. 
  }

  onDeclineChallenge(challengeId:number): void {
    const answer = confirm(`Do you really want to decline this challenge ?`);
    if(answer)
      alert(`Challenge ${challengeId} declined :( !`);
    // API request: delete the challenge and go back to the referrer
    // (the link the user comes from)
    // Need a query param for that.
  }
}
