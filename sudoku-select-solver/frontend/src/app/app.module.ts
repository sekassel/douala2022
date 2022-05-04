import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectedComponent } from './selected/selected.component';
import { BoardComponent } from './board/board.component';
import { InputDialogComponent } from './board/input-dialog/input-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    SelectedComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputDialogComponent,
    FormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
