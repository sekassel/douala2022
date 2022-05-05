import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { json } from 'express'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validNames:string[]=[];
  validPassword:string[]=[]
  debugOut=''
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    // just put some example data into server
    const params={
      topic: 'publish',
      targetTopic: 'user-created',
      payload: {
          userName: 'Rene',
          password: 'secret',
          token: '21345621'
      }
    }
    console.log('trying to push Albert to user created');

    this.http.get<string>('http://localhost:3333')
    .subscribe(
      answer => console.log('get got an answer'),
      error => console.log('get got an error')
    )

    this.http.post('http://localhost:3333/publish', params)
    .subscribe(
      answer => console.log('post got answer \n' + JSON.stringify(answer, null, 3)),
      error => console.log('post got an error')
    )
    this.validNames=['john','joe','carlie','alice'];
    this.validPassword=['1234','5678','91011','131415'];
    this.http.get<any[]>('http://localhost:3333/topic?id=user-created').subscribe(
      async answer=>{
        this.debugOut=JSON.stringify(answer,null,3)
        console.log(this.debugOut)
      },
      error=>this.debugOut= JSON.stringify(error,null,3)
    );
  }

  formGroup = new FormGroup({
    username: new FormControl('',[Validators.required,this.usernameValidator()]),
    password: new FormControl('',[Validators.required,this.passwordValidator()]),
  });

  usernameValidator(){
    return (control: AbstractControl): ValidationErrors | null=>{
      const forbidden =(control.value.length<0) ||(this.validNames.indexOf(control.value)<0);
      return forbidden ?{forbiddenName: {value: control.value}}:null
    };
  }

  passwordValidator(){
    return (control: AbstractControl): ValidationErrors | null=>{
      const forbidden =(control.value.length<0) || (this.validPassword.indexOf(control.value)<0);
      return forbidden ?{forbiddenNumber: {value: control.value}}:null
    };
  }


  async connexion(){
    console.log('connexion started')
    const params={
      topic: 'publish',
      targetTopic: 'user-created',
      payload: {
          userName: this.formGroup.get('username')?.value,
          password: this.formGroup.get('password')?.value,
          token: '21345621'
      }
    }

    try {
      this.http.post<any>('http://localhost:3333/publish',params)
      .subscribe(
        answer => console.log('post publish got an answer' + JSON.stringify(answer, null, 3)),
        error => console.log('post publish got an error')
      )

      this.http.get<any[]>('http://localhost:3333/topic?id=user-created')
      .subscribe(
        answer => console.log('get topic got an answer' + JSON.stringify(answer, null, 3)),
        error => console.log('get topic got an error')
      )

    } catch (error) {
      console.log(JSON.stringify(error,null,3))
    }

  }

}
