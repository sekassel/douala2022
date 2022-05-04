import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

interface Team {
  teamName: string,
  creationDate: string,
  challengeLost: number,
  challengeWon: number
}
@Component({
  selector: 'app-team-viewer',
  templateUrl: './team-viewer.component.html',
  styleUrls: ['./team-viewer.component.scss'],
  providers: [DecimalPipe]
})





export class TeamViewerComponent implements OnInit {

  teams: Team[] = [
    {
      "teamName": "Pratt",
      "creationDate": "2016-12-26",
      "challengeWon": 36,
      "challengeLost": 38
    },
    {
      "teamName": "Potts",
      "creationDate": "2015-05-28",
      "challengeWon": 26,
      "challengeLost": 0
    },
    {
      "teamName": "Marquez",
      "creationDate": "2018-12-02",
      "challengeWon": 30,
      "challengeLost": 4
    },
    {
      "teamName": "Smith",
      "creationDate": "2020-03-13",
      "challengeWon": 31,
      "challengeLost": 30
    },
    {
      "teamName": "Henson",
      "creationDate": "2014-09-01",
      "challengeWon": 26,
      "challengeLost": 23
    },
    {
      "teamName": "Monroe",
      "creationDate": "2018-06-30",
      "challengeWon": 25,
      "challengeLost": 36
    },
    {
      "teamName": "Osborn",
      "creationDate": "2021-12-06",
      "challengeWon": 16,
      "challengeLost": 18
    },
    {
      "teamName": "Kline",
      "creationDate": "2022-02-27",
      "challengeWon": 38,
      "challengeLost": 5
    },
    {
      "teamName": "Gibson",
      "creationDate": "2018-10-18",
      "challengeWon": 34,
      "challengeLost": 17
    },
    {
      "teamName": "Cline",
      "creationDate": "2015-05-16",
      "challengeWon": 26,
      "challengeLost": 25
    },
    {
      "teamName": "Knight",
      "creationDate": "2017-04-01",
      "challengeWon": 7,
      "challengeLost": 3
    },
    {
      "teamName": "Cooper",
      "creationDate": "2020-07-19",
      "challengeWon": 39,
      "challengeLost": 22
    }
  ]

  teams$!: Observable<Team[]>;
  filter = new FormControl('');

  search(text: string, pipe: PipeTransform): Team[] {
    return this.teams.filter(team => {
      const term = text.toLowerCase();
      return team.teamName.toLowerCase().includes(term)
          || pipe.transform(team.challengeLost).includes(term)
          || pipe.transform(team.challengeLost).includes(term);
    });
  }
  
  constructor(pipe: DecimalPipe) {
    this.teams$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }


  ngOnInit(): void {
  }

}
