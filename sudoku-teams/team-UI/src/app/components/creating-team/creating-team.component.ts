import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-creating-team',
  templateUrl: './creating-team.component.html',
  styleUrls: ['./creating-team.component.scss']
})
export class CreatingTeamComponent implements OnInit {
  useName = ""
  teamName = ""
    

  constructor(private http: HttpClient, 
    private router: Router,
    ) { }

  ngOnInit(): void {
   /*  this.http.get<any>('localhost:4000/query/user')
    .subscribe(
      answer => this.handleQueryResponse(answer),
      error => this.teamResul = JSON.stringify(error, null,3)
    ); */
  }
/* handleQueryResponse(answer: any){
    console.log(answer)
    this.use = answer
  }
   */
  newTeam(){
    if(this.useName == "" && this.teamName== ""){
      this.router.navigate(['/manageTeams/creating-team'])
    }
    else{
      const param = {
        useName:this.useName,
        teamName:this.teamName
        
      }
  
      this.http.post<any>('http://localhost:3000/new', param).subscribe (
        (data)=>{
          console.log(`data  ${JSON.stringify(param, null, 3)}`)
          console.log(`data  ${JSON.stringify(data, null, 3)}`)
          this.router.navigate(['/manageTeams'])
      },
       error => console.log(`error   rien ${JSON.stringify(error, null, 3)}` )
     );
    }

    }
    
}
