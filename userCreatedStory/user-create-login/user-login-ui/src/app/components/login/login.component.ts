import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
    console.log('trying to push Albert to user created');
    const
    this.http.post('http://localhost:3333/publish')
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

  connexion(){}
}
