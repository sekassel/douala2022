import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatingTeamComponent } from './components/creating-team/creating-team.component';
import { TeamsManagementComponent} from './components/teams-management/teams-management.component';
const routes: Routes = [
  /* {path: 'manageTeams',component:TeamsManagementComponent}, */
  { path: 'creating-team',component:CreatingTeamComponent }
 /*  teams-management/creating-team */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
