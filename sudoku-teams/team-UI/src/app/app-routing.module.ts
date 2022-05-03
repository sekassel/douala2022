import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatingTeamComponent } from './components/creating-team/creating-team.component';

const routes: Routes = [ { path: 'teams-management/creating-team',component:CreatingTeamComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
