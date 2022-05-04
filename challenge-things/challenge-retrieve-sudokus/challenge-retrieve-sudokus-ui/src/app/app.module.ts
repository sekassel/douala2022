import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamViewerComponent } from './components/team-viewer/team-viewer.component';
import { SearchTeamComponent } from './components/search-team/search-team.component';
import { TeamComponent } from './components/team/team.component';
import { InviteComponent } from './components/invite/invite.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeamViewerComponent,
    SearchTeamComponent,
    TeamComponent,
    InviteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
