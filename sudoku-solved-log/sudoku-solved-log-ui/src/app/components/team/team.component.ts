import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input()
  teamName!: string;

  @Input()
  startDate!: string;

  @Input()
  sudokuSolved!: number;

  @Input()
  sudokus!: number;

  @Input()
  members!: number;

  percent!: number;
  

  constructor() {
    this.percent = (this.sudokuSolved / this.sudokus) * 100;
   }

  ngOnInit(): void {
  }

}
