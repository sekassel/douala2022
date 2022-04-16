import { Component, OnInit } from '@angular/core';
import { createRxDatabase } from 'rxdb';
import { getRxStoragePouch, addPouchPlugin } from 'rxdb/plugins/pouchdb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'douala-tetris';

  ngOnInit(): void {
    console.log("Starting app, creating database");

  }
}
