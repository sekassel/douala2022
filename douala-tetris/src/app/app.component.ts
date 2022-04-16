import { Component, OnInit } from '@angular/core';
import { createRxDatabase } from 'rxdb';
import { getRxStoragePouch, addPouchPlugin } from 'rxdb/plugins/pouchdb';
import { highScoreCollectionMethods, HighScoreDatabase, HighScoreDatabaseCollections, highScoreDocMethods, highScoreSchema } from './modules/scoredatabase/highscoresschema'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { ScoreserviceService } from './modules/scoredatabase/scoreservice.service'

addPouchPlugin(require('pouchdb-adapter-idb'));
console.log('pouchdb-adapter-idb added')



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'douala-tetris';

  constructor(
    private scoreService: ScoreserviceService
  ) {  }

  async ngOnInit() {
    await this.scoreService.init();
    const amount = await this.scoreService.scoresDatabase?.scores.countAllDocuments();
    console.log(`app has started and we have ${amount} scores in our database`)
  }
}
