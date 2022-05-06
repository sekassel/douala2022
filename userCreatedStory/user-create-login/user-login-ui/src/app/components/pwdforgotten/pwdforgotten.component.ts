import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../authentification.service';
import { DialogueComponent } from '../dialogue/dialogue.component';

@Component({
  selector: 'app-pwdforgotten',
  templateUrl: './pwdforgotten.component.html',
  styleUrls: ['./pwdforgotten.component.scss']
})
export class PwdforgottenComponent implements OnInit {
  valide:boolean=false
  constructor(private http:HttpClient, private auth:AuthentificationService, private router:Router, public dialog: MatDialog) { }
  ngOnInit(): void {
  }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  formGroup = new FormGroup({
    username: new FormControl('',[Validators.required,this.usernameValidator()]),
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.emailPattern)],
    }),

    });



  usernameValidator(){
    return (control: AbstractControl): ValidationErrors | null=>{
      const forbidden =(control.value.length<0);
      return forbidden ?{forbiddenUserName: {value: control.value}}:null
    };
  }

   delay(milliseconds : number) {
    return new Promise(resolve => setTimeout( resolve, milliseconds));
  }

  async connexion(){
    console.log('dfsa')
    if(!this.valide){
      this.dialog.open(DialogueComponent,{data:{img:"./../../../assets/loader.gif"}, disableClose: true });
      this.auth.getUsers().subscribe(
        res=>{

          console.log('got an answer');
          res.forEach(element => {
          if (element.payload.userName==this.formGroup.get('username')?.value && element.payload.email==this.formGroup.get('email')?.value) {
              this.valide=true
          }
          });

          if (this.valide) {

          ( async() => {
              console.log('Starting, will sleep for 5 secs now');
              await this.delay(3000);
              this.dialog.closeAll()
              this.dialog.open(DialogueComponent,{data:{img:"./../../../assets/checked.png"}, disableClose: true });

              this.dialog.open(DialogueComponent,{data:{img:"./../../../assets/grille.svg"}, disableClose: true });
              await this.delay(1000);
              window.location.href = "https://google.com";
          })();

          } else {
            ( async() => {
              await this.delay(2000);
              this.dialog.closeAll()
             this.dialog.open(DialogueComponent,{data:{img:"./../../../assets/fail.png",msg:"UserName or Email Incorect"}});
          })();
          }
      }
          ,
        err=>()=>{console.log(err)}
      )
    }else{
      this.dialog.open(DialogueComponent,{data:{img:"./../../../assets/loader.gif"}, disableClose: true });
      const params={
        userName:this.formGroup.get('userName')?.value,
        password:this.formGroup.get('password2')?.value
      }
      this.auth.resetPassword(params).subscribe(
        answer=>{

        },
        err=>console.log(err)
      )
    }


  }
}
