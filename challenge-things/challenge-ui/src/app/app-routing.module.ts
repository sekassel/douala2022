import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeDetailsComponent } from './components/challenge-details/challenge-details.component';

const routes: Routes = [
  
  {
		path: 'details',
		component: ChallengeDetailsComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
