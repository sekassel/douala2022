import { Component, OnInit } from '@angular/core';
import {Board} from "../models/board";
import {Difficulty} from "../models/difficulty";
import {MatDialog} from "@angular/material/dialog";
import {SudokuService} from "../services/sudoku.service";
import {OptionsComponent} from "../options/options.component";
import {SuccessDialogComponent} from "../success-dialog/success-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  title = 'Sudoku';
  board: Board = [];
  difficulty: Difficulty = window.localStorage.getItem('difficulty') as Difficulty || 'medium'
  boardLocked: Boolean = false;

  constructor(public dialog: MatDialog,
              private sudokuService: SudokuService,
              private router: Router) {}

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

  logout(){
    localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
