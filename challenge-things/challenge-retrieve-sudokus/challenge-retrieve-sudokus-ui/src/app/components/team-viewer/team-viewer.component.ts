import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

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

  teams!: Team[];

  teams$!: Observable<Team[]>;
  toFilter = new FormControl('');
  pipe!: DecimalPipe;

  search(text: string, pipe: PipeTransform): Team[] {
    return this.teams.filter(team => {
      const term = text.toLowerCase();
      return team.teamName.toLowerCase().includes(term)
          || pipe.transform(team.challengeLost).includes(term)
          || pipe.transform(team.challengeLost).includes(term);
    });
  }
  
  constructor(
    pipe: DecimalPipe,
    private http: HttpClient
  ) {

    console.log(`Constructor called....`)
    this.http.get<any>('http://localhost:3000/teams')
    .subscribe(
      teams => {
        console.log(`Teams got from get request :\n ${JSON.stringify(teams, null, 3)}`);
        this.teams = teams; 
      },
      err => console.log(`Got error from the get request : \n${JSON.stringify(err, null, 3)}`),
      () => {
        this.teams$ = this.toFilter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, pipe))
        );
      }
    )


  }


ngOnInit() {

  }

  initTeams() {
    
  }

}
