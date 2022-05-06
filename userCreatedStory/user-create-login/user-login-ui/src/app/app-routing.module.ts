import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { LoginComponent } from './components/login/login.component';
import { PwdforgottenComponent } from './components/pwdforgotten/pwdforgotten.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'addUser', component: AddUserComponent},
  {path:'passwordforgotten', component: PwdforgottenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
