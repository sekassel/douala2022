import { Injectable, OnInit } from '@angular/core';

import { createRxDatabase } from 'rxdb';
import { getRxStoragePouch, addPouchPlugin } from 'rxdb/plugins/pouchdb';
import { highScoreCollectionMethods, HighScoreDatabase, HighScoreDatabaseCollections, highScoreDocMethods, highScoreSchema } from './highscoresschema'
addPouchPlugin(require('pouchdb-adapter-idb'));
console.log('pouchdb-adapter-idb added')

@Injectable({
  providedIn: 'root'
})
export class ScoreserviceService {

  scoresDatabase?: HighScoreDatabase;

  constructor() { }

  async init() {
    console.log("Starting app, creating database");
    /**
     * create database and collections
     */

    try {
      this.scoresDatabase = await createRxDatabase<HighScoreDatabaseCollections>({
        name: 'highscoresdb',
        storage: getRxStoragePouch('idb')
      });
      console.log("             creating database is done");

      await this.scoresDatabase.addCollections({
        scores: {
            schema: highScoreSchema,
            methods: highScoreDocMethods,
            statics: highScoreCollectionMethods
        }
      });
      console.log(`             collection added`);

      await this.scoresDatabase.scores.insert({
        dateTime: '2022-04-14T19:02:00',
        score: '42',
        player: 'AlbDelZun'
      })
      console.log(`             first score inserted`);

      await this.scoresDatabase.scores.insert({
        dateTime: '2022-04-14T19:03:00',
        score: '23',
        player: 'AlbDelZun'
      })
      console.log(`             second score inserted`);
    } catch (error) {
      console.log(`got error\n ${JSON.stringify(error)}`)
    }
  }
}
