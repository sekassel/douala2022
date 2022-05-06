import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import MSTeam from '../teams-management/TeamSchema';

@Component({
  selector: 'app-manage-my-team',
  templateUrl: './manage-my-team.component.html',
  styleUrls: ['./manage-my-team.component.scss']
})
export class ManageMyTeamComponent implements OnInit {
  team = ""
  user=''
  requests:Array<String>
  invitations:Array<String>
  members:any[] = []


  constructor(private http: HttpClient, 
    private route :ActivatedRoute) {

    this.requests = ["Request from Grace","Request from Grace","Request from Grace"]
    this.invitations = ["User Grace Enyegue","User Grace Enyegue","User Grace Enyegue"]
    this.user = 'Grace'
   }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
     this.team = params['team']
    })

    this.http.get<any>('http://localhost:3000/query/')
    .subscribe(
      answer => {
        this.handleQueryResponse(answer);
        console.log("myTeam"+JSON.stringify(answer, null,3));
      },
      error =>  console.log('error: \n' + JSON.stringify(error, null,3))   
    ); 

  }


  handleQueryResponse(answer:MSTeam[])
  {
    console.log("name team"+this.team);
    
     this.members = []
     for (const team of answer) {
       if(this.team == team.teamName){
         this.members.push(team.admin)
         for (const mem of team.members) {
            this.members.push(mem)
         }
       }
     }
  }

  AddMember(){

  }

  DelMember(){
    
  }

}