import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-my-team',
  templateUrl: './manage-my-team.component.html',
  styleUrls: ['./manage-my-team.component.scss']
})
export class ManageMyTeamComponent implements OnInit {
  requests:Array<String>
  invitations:Array<String>
  members:Array<String>
  img:string
  constructor() {
    this.requests = ["Request from Grace","Request from Grace","Request from Grace"]
    this.invitations = ["One of Grace's teams","One of Grace's teams","One of Grace's teams"]
    this.members = ["One of Grace's teams","One of Grace's teams","One of Grace's teams"]
    this.img = "27.jpg"
   }

  ngOnInit(): void {
  }
}
