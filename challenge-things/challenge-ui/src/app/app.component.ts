import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent, DialogData } from './dialog/dialog.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'challenge-ui';
  challenge?: DialogData;

  dataSend = [
    {
      challengeName: "name1",
      date: "21 may 2022"
    },
    {
      challengeName: "name2",
      date: "21 may 2022"
    },
    {
      challengeName: "name3",
      date: "21 may 2022"
    }
  ]


  constructor(
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: this.dataSend,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialog = result;
    });
  }


}
