import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SudokuLogComponent } from './components/sudoku-log/sudoku-log.component';

const routes: Routes = [
  { path: '', component: SudokuLogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
