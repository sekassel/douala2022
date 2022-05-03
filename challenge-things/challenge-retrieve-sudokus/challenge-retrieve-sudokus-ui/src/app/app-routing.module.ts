import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TeamViewerComponent } from './components/team-viewer/team-viewer.component';
//import { RetriveFormComponent } from './components/retrive-form/retrive-form.component';


  const routes: Routes = [
    { 'path': '', component: TeamViewerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
