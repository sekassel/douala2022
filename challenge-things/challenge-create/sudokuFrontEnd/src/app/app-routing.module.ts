import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeCreateComponent } from './UI/challenge-create/challenge-create.component';

const routes: Routes = [
  { path: '', component: ChallengeCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
