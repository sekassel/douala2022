import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-retrive-form',
  templateUrl: './retrive-form.component.html',
  styleUrls: ['./retrive-form.component.scss']
})
export class RetriveFormComponent implements OnInit {


  formGroup = new FormGroup({
    challengeId: new FormControl('', [Validators.required])
  });
  constructor() { }


  ngOnInit() {
  }

  retrieve() {

  }

}
