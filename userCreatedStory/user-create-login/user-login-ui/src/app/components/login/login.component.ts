import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthentificationService } from './../../authentification.service';
import { DialogueComponent } from '../dialogue/dialogue.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  debugOut=''
  valide:boolean=false
  constructor(private http:HttpClient, private auth:AuthentificationService, private router:Router, public dialog: MatDialog) { }


  openDialog() {
    this.dialog.open(DialogueComponent,{ disableClose: true });
  }
  ngOnInit(): void {
    // just put some example data into serve
  }

  formGroup = new FormGroup({
    username: new FormControl('',[Validators.required,this.usernameValidator()]),
    password: new FormControl('',[Validators.required,this.passwordValidator()]),
  });

  usernameValidator(){
    return (control: AbstractControl): ValidationErrors | null=>{
      const forbidden =(control.value.length<0);
      return forbidden ?{forbiddenUserName: {value: control.value}}:null
    };
  }



  passwordValidator(){
    return (control: AbstractControl): ValidationErrors | null=>{
      const forbidden =(control.value.length<0) ;
      return forbidden ?{forbiddenPassword: {value: control.value}}:null
    };
  }






  async connexion(){
    this.dialog.open(DialogueComponent,{data:{img:"./../../../assets/loader.gif"}, disableClose: true });
    this.auth.getUsers().subscribe(
      res=>{

        console.log('got an answer');
        res.forEach(element => {
        if (element.payload.userName==this.formGroup.get('username')?.value && element.payload.password==this.formGroup.get('password')?.value) {
            this.valide=true
        }
        });
        function delay(milliseconds : number) {
          return new Promise(resolve => setTimeout( resolve, milliseconds));
        }
        if (this.valide) {

        ( async() => {
            console.log('Starting, will sleep for 5 secs now');
            await delay(1000);
            this.dialog.closeAll()
            this.dialog.open(DialogueComponent,{data:{img:"./../../../assets/checked.png"}, disableClose: true });

            // this.dialog.open(DialogueComponent,{data:{img:"./../../../assets/grille.svg"}, disableClose: true });
            await delay(500);
            window.location.href = "https://sudoku-rodriguembiaha.herokuapp.com/";
            //waiting for the landing page
            this.dialog.closeAll()
        })();

        } else {
          ( async() => {
            await delay(1000);
            this.dialog.closeAll()
            this.dialog.open(DialogueComponent,{data:{img:"./../../../assets/fail.png",msg:"Password or UserName Incorect"}});
        })();
        }
    }
        ,
      err=>()=>{console.log(err)}
    )

  }

}
