import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-management',
  templateUrl: './teams-management.component.html',
  styleUrls: ['./teams-management.component.scss']
})
export class TeamsManagementComponent implements OnInit {
  myTeams:Array<String>
  allTeams:Array<String>
  createdTeams:Array<String>
  constructor() {
    this.myTeams = ["One of Grace's teams","One of Grace's teams","One of Grace's teams"]
    this.allTeams = ["One of Grace's teams","One of Grace's teams","One of Grace's teams"]
    this.createdTeams = ["One of Grace's teams","One of Grace's teams","One of Grace's teams"]
   }

  ngOnInit(): void {
  }

}
