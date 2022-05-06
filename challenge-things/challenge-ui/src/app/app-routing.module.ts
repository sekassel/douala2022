import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeDetailsComponent } from './components/challenge-details/challenge-details.component';
import { ChallengeNotificationComponent } from './components/challenge-notification/challenge-notification.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: '/notification',
    pathMatch: 'full'
  },
  {
		path: 'details',
		component: ChallengeDetailsComponent
	},
  {
		path: 'notification',
		component: ChallengeNotificationComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
