import { Component, OnInit } from '@angular/core';
import { ScoreserviceService } from '../scoredatabase/scoreservice.service'

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.scss']
})
export class HighscoresComponent implements OnInit {

  debugMessage = 'Hello from HighscoresComponent'

  constructor(
    private scoreService: ScoreserviceService
  ) { }

  async ngOnInit() {
    // get scores from the database
    try {
      await this.scoreService.initFlag;
      const amount = await this.scoreService.scoresDatabase?.scores.countAllDocuments();
      console.log(`HighscoresComponent.ngOnInit has started and we have ${amount} scores in our database`)
      const scoreList = await this.scoreService.scoresDatabase?.scores.find({
        selector: {},
        sort: [{
          score: 'desc'
        }]
      }).exec();
      this.debugMessage = JSON.stringify(scoreList, null, 3)
      console.log(`HighscoresComponent.ngOnInit scorelist ist \n ${JSON.stringify(scoreList)}`)
    } catch (error) {
      console.log(`HighscoresComponent.ngOnInit got error\n ${JSON.stringify(error)}`)
    }
  }

}
