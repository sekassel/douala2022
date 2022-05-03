import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsManagementComponent } from 'src/app/components/teams-management/teams-management.component';

const routes: Routes = [
  { path: 'manageTeams', component: TeamsManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
