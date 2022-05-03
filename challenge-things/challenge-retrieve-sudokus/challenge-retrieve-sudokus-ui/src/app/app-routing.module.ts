import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetriveFormComponent } from './components/retrive-form/retrive-form.component';


  const routes: Routes = [
    { 'path': '', component: RetriveFormComponent},
    { 'path': 'retrieve-form', component: RetriveFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
