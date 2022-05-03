import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-creating-team',
  templateUrl: './creating-team.component.html',
  styleUrls: ['./creating-team.component.scss']
})
export class CreatingTeamComponent implements OnInit {
    use = ""
    teamName = ""
    teamResul = ""

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any>('localhost:4000/query/user')
    .subscribe(
      answer => this.handleQueryResponse(answer),
      error => this.teamResul = JSON.stringify(error, null,3)
    );
  }
handleQueryResponse(answer: any){
    console.log(answer)
    this.use = answer
  }
  
  newTeam(){
    const param = {
      use:this.use,
      teamName:this.teamName
    }

    this.http.post<any>('localhost:4000/new', param).subscribe (
      (response)=>{
     this.router.navigate(['/manageTeams'])
    },
     error => console.log(`error  ${JSON.stringify(error, null, 3)}` )
   );
  }
 
}
