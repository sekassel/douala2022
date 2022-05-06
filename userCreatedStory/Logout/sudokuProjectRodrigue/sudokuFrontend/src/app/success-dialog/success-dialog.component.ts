import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Difficulty} from '../models/difficulty'

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public difficulty: Difficulty) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

}
