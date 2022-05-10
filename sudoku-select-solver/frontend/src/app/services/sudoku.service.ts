import {Injectable } from '@angular/core';
import {Difficulty} from '../models/difficulty'
import {Board} from '../models/board'

 const sudoku = require('sudoku-umd');
@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  constructor() { }


  createBoard(difficulty: Difficulty): Board{
    let puzzle = sudoku.generate(difficulty)
    const solution = sudoku.board_string_to_grid(sudoku.solve(puzzle))
    puzzle = sudoku.board_string_to_grid(puzzle)

    return solution.map((row: any[], i: number) => row.map( (value, j) => ({solution: +value, preset: puzzle[i][j] !== '.', row: i, column: j, numberOfConflicts: 0,
      value: (puzzle[i][j] !== '.' ? +value : 0), top: i%3===0, bottom: i%3===2, left: j%3===0, right: j%3===2 })));
  }


}
