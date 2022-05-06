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
  title = 'Sudoku';
  board: Board = [];
  difficulty: Difficulty = window.localStorage.getItem('difficulty') as Difficulty || 'medium'
  boardLocked: Boolean = false;

  constructor(public dialog: MatDialog, private sudokuService: SudokuService ) {}

  ngOnInit() {
    this.newGame()
  }


  newGame(): void {
    this.board = this.sudokuService.createBoard(this.difficulty)
    this.boardLocked = false;
  }

  openOptions(): void {
    let dialogRef = this.dialog.open(OptionsComponent, {
      autoFocus: true,
      data: this.difficulty
    });
    dialogRef.afterClosed().subscribe(difficulty => {
      if(difficulty && difficulty !== this.difficulty) {
        this.difficulty = difficulty;
        window.localStorage.setItem('difficulty', this.difficulty)
        this.newGame()
      }
    });
  }



  onGameSolved(): void {
    let dialogRef = this.dialog.open(SuccessDialogComponent, {
      autoFocus: true,
      data: this.difficulty,
      panelClass: 'success-dialog'
    });
    dialogRef.afterClosed().subscribe(newGame => {
      if(newGame) this.newGame();
    });
  }


  solve(): void {
    this.boardLocked = true;
    this.board.forEach(row => row.forEach(cell => {cell.value = cell.solution; cell.numberOfConflicts=0}))
  }

}
