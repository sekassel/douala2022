import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import MSTeam from './TeamSchema';

@Component({
  selector: 'app-teams-management',
  templateUrl: './teams-management.component.html',
  styleUrls: ['./teams-management.component.scss']
})
export class TeamsManagementComponent implements OnInit {
  user = ""
  myTeams:any[]=[]
  allTeams:any[]=[]
  createdTeams:any[]= []
  constructor(private http: HttpClient, 
    private router: Router,) {
    this.user = "Grace"
   }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/query/')
    .subscribe(
      answer => {
        //console.log(JSON.stringify(answer, null,3));
        this.handleQueryResponse(answer);
        //this.createdTeams = answer;
      },
      error =>  console.log('error: \n' + JSON.stringify(error, null,3))
      
    ); 

  }
  
  handleQueryResponse(answer: MSTeam[]){
    this.createdTeams =[]
    this.myTeams = []
    this.allTeams = []
    console.log(answer)
    //console.log('answer')
    for(const team of answer){
      //Les teams crees
      if(team.admin == this.user){
        this.createdTeams.push(team.teamName)
      }
      //Les teams dans lesquelsje fait partie
     if(team.members.indexOf(this.user)>=0){
          this.myTeams.push(team.teamName)
        }
      
      
       //Les autre teams 
      if((team.admin != this.user) && (team.members.indexOf(this.user) < 0)){
        this.allTeams.push(team.teamName)
    }
  }
}

}
