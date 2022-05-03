import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighscoresModule } from './modules/highscores/highscores.module'
import { ScoredatabaseModule } from './modules/scoredatabase/scoredatabase.module'
import { ScoreserviceService } from './modules/scoredatabase/scoreservice.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScoredatabaseModule,
    HighscoresModule
  ],
  providers: [ScoreserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
