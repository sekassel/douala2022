import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatingTeamComponent } from './components/creating-team/creating-team.component';
import { TeamsManagementComponent } from './components/teams-management/teams-management.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatingTeamComponent,
    TeamsManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
