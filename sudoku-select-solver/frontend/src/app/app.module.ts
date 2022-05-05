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
import {FormsModule}   from '@angular/forms';
import { OptionsComponent } from './options/options.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    InputDialogComponent,
    OptionsComponent,
    SuccessDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatRadioModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
