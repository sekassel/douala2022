import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputDialogComponent } from './board/input-dialog/input-dialog.component';
import { MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OptionsComponent } from './options/options.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import { UserComponent } from './user/user.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import { HomeComponent } from './home/home.component';

const appRoute: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserComponent},
  {path: 'home', component: HomeComponent},
  {path: '', component: LoginComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    InputDialogComponent,
    OptionsComponent,
    SuccessDialogComponent,
    LoginComponent,
    UserComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatRadioModule,
    RouterModule.forRoot(appRoute),
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
