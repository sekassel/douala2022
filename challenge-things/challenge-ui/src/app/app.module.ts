import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogComponent } from './components/dialog/dialog.component' 
import { MatCardModule } from '@angular/material/card';
import { ChallengeDetailsComponent } from './components/challenge-details/challenge-details.component';
import { ChallengeNotificationComponent } from './components/challenge-notification/challenge-notification.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ChallengeDetailsComponent,
    ChallengeNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
