import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatingTeamComponent } from './components/creating-team/creating-team.component';
import { ManageMyTeamComponent } from './components/manage-my-team/manage-my-team.component';
import { TeamsManagementComponent } from './components/teams-management/teams-management.component';


const routes: Routes = [
  {path: 'manageTeams', component: TeamsManagementComponent},
  {path: 'manageTeams/creating-team',component:CreatingTeamComponent },
  {path: 'manageTeams/managemyteam/:team', component:ManageMyTeamComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
