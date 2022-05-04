import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { CommunicationService } from './services/communication.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'challenge-ui';

  dataSend = [
    {
      challengeName: "name1",
      date: "21 may 2022",
      new: true,
      accpeted: false
    },
    {
      challengeName: "name2",
      date: "21 may 2022",
      new: true,
      accpeted: false
    },
    {
      challengeName: "name3",
      date: "21 may 2022",
      new: true,
      accpeted: false
    }
  ]


  constructor(
    public dialog: MatDialog,
    private communicationService: CommunicationService
  ) {}


  ngOnInit(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: this.dataSend,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.communicationService.challenge = result;
    });
  }


}
