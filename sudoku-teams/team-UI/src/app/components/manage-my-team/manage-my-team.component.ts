import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-my-team',
  templateUrl: './manage-my-team.component.html',
  styleUrls: ['./manage-my-team.component.scss']
})
export class ManageMyTeamComponent implements OnInit {
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
