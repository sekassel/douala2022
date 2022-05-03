import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-management',
  templateUrl: './teams-management.component.html',
  styleUrls: ['./teams-management.component.scss']
})
export class TeamsManagementComponent implements OnInit {
  allTeams:Array<String>
  createdtTeams:Array<String>
  myTeams:Array<String>



  constructor() {
    this.allTeams = ["djvhbbrdghieruegfbvuyvkjbv","kfdjrgtbdiuhrvguierviuh","cdkjvbg dbvfgrufvigreiughiur","jvgfydhbvffbu","cdkjvbg dbvfgrufvigreiughiur"]
    this.createdtTeams = ["djvhbbrdghieruegfbvuyvkjbv","kfdjrgtbdiuhrvguierviuh","cdkjvbg dbvfgrufvigreiughiur","jvgfydhbvffbu","cdkjvbg dbvfgrufvigreiughiur"]
    this.myTeams = ["djvhbbrdghieruegfbvuyvkjbv","kfdjrgtbdiuhrvguierviuh","cdkjvbg dbvfgrufvigreiughiur","jvgfydhbvffbu","cdkjvbg dbvfgrufvigreiughiur"]

  }

  ngOnInit(): void {
  }

}
