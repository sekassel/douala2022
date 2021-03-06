import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/services/communication.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-challenge-notification',
  templateUrl: './challenge-notification.component.html',
  styleUrls: ['./challenge-notification.component.scss']
})
export class ChallengeNotificationComponent implements OnInit {

  title = 'challenge-ui';
  dataIsAllow = false;
  

   // New props
   challenges: Array<object> = [];
   sudokus: Array<object> = [];


  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {

    
  }


  ngOnInit(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      CommunicationService.challenge = result;
      this.router.navigate(['/details']);
    });
  }


  

  // sendMsg(event:EventDTO) {
  //   this.ws.events.next(event);
  // }
}
