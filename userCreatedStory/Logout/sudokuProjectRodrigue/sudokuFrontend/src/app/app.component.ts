import {Component, OnInit, ViewChild} from '@angular/core';
import {Board} from './models/board';
import {OptionsComponent} from './options/options.component'
import {SuccessDialogComponent} from './success-dialog/success-dialog.component'
import {MatDialog} from '@angular/material/dialog';
import {Difficulty} from './models/difficulty'
import {SudokuService} from './services/sudoku.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
