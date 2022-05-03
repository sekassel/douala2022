import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighscoresComponent } from './modules/highscores/highscores.component'
import { TetrisComponent } from './modules/tetris/tetris.component'

const routes: Routes = [
  { path: 'scores', component: HighscoresComponent },
  { path: '', component: TetrisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
