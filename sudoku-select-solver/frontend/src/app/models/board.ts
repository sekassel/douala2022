
export type Board = Cell[][];

export interface Cell {
  value?: number;
  solution: number;
  preset: boolean;
  numberOfConflicts: number;
  row: number;
  column: number;
}