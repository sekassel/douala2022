import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Board, Cell} from '../models/board'
import {MatDialog} from '@angular/material/dialog';
import {InputDialogComponent} from './input-dialog/input-dialog.component'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input()
  board!: Board;
  @Output() gameSolved = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}


  cellClicked(cell: Cell): void {
    if(cell.preset) return;
    let dialogRef = this.dialog.open(InputDialogComponent, {
      height: '20em',
      width: '15em',
      autoFocus: true,
      panelClass: "input-dialog"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result || result === 0) {
        const oldValue = cell.value, newValue = result;
        cell.value = result;
        this.updateConflicts({cell, oldValue, newValue})
        this.validate();
      }
    });
  }



validate() {
  // If every cell on the board has a value and has no conflicts with other cells, the game is solved
  if(this.board.map(row => row.filter(cell => cell.value && !cell.numberOfConflicts).length).reduce((a, b) => a+b, 0) === 81)
      this.gameSolved.emit();
}


private updateConflicts({cell, oldValue, newValue}:any): void {
  let conflictingCells: Set<Cell>;
  if(oldValue) {
    conflictingCells = this.calculateConflicts(cell, oldValue)
    cell.numberOfConflicts = 0
    conflictingCells.forEach(c => c.numberOfConflicts--)
  }
  if(newValue) {
    conflictingCells = this.calculateConflicts(cell, newValue)
    cell.numberOfConflicts = conflictingCells.size;
    conflictingCells.forEach(c => c.numberOfConflicts++);
  }
}

private calculateConflicts(cell: Cell, value: number): Set<Cell> {
    let conflicts: Set<Cell> = new Set<Cell>();
    // search for conflicts in cell row:
    this.board[cell.row].forEach((c) => {if(c.value === value) conflicts.add(c)});
    // search for conflicts in cell column
    for(let i=0; i<9; i++) {
      const c = this.board[i][cell.column]
      if(c.value === value) conflicts.add(c)
    }
    // search for conflicts in 3x3 field
    const rowStart = Math.floor(cell.row/3)*3, columnStart = Math.floor(cell.column/3)*3;
    for(let i=rowStart; i< rowStart+3; i++) {
      for(let j=columnStart; j< columnStart+3; j++) {
        const c = this.board[i][j]
        if(c.value === value) conflicts.add(c)
      }
    }
    // delete the current cell from the set and return
    conflicts.delete(cell);
    return conflicts;
}




}
