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
  constructor() {
    this.requests = ["Request from Grace","Request from Grace","Request from Grace"]
    this.invitations = ["User Grace Enyegue","User Grace Enyegue","User Grace Enyegue"]
    this.members = ["User Grace Enyegue","User Grace Enyegue","User Grace Enyegue"]
   }

  ngOnInit(): void {
  }
}
