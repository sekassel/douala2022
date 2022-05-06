import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Difficulty} from '../models/difficulty'

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']

})
export class OptionsComponent {
  difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'very hard', 'insane', 'inhuman'] as Difficulty[]

  constructor(
    public dialogRef: MatDialogRef<OptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedDifficulty: Difficulty) {}


  valueSelected(value: number): void {
    this.dialogRef.close(value)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
