import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { CommunicationService } from './services/communication.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'challenge-ui';

  


  constructor(
    public dialog: MatDialog,
    private communicationService: CommunicationService,
    private router: Router
  ) {}


  ngOnInit(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: this.communicationService.dataSend,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.communicationService.challenge = result;
      this.router.navigate(['/details']);
    });
  }


}
