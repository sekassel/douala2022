import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthentificationService } from './../../authentification.service';
import { v4 as uuidv4 } from 'uuid';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { environment } from 'src/environments/environment'
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private http:HttpClient, private auth:AuthentificationService, private router:Router, public dialog: MatDialog) { }

  valid:boolean=true
  ngOnInit(): void {
  }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  formGroup = new FormGroup({
    username: new FormControl('',[Validators.required,this.usernameValidator()]),
    password: new FormControl('',[Validators.required,this.usernameValidator()]),
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.emailPattern)],
    })
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

  createUser(){
    this.valid=true
    this.dialog.open(DialogueComponent,{data:{img: environment.assetsPath + "loader.gif"}, disableClose: true });
    const params={
      topic: 'publish',
      targetTopic: 'user-created',
      payload: {
          userName: this.formGroup.get('username')?.value,
          password: this.formGroup.get('password')?.value,
          email: this.formGroup.get('email')?.value,
          time: new Date().toISOString(),
          token: uuidv4()
      }
    }

    this.auth.getUsers().subscribe(
      answer=>{
        answer.forEach(element => {
              if (element.payload.userName==this.formGroup.get('username')?.value) {
                   this.valid=false
              }
          });
          if(this.valid){
                this.auth.adduser(params).subscribe(
                  answer => {
                    ( async() => {
                      await this.delay(2000);
                      this.dialog.closeAll()
                      this.dialog.open(DialogueComponent,{data:{img:"./../../../assets/checked.png"}, disableClose: true });
                      await this.delay(2000);
                      this.dialog.closeAll()
                      this.router.navigate([''])
                  })();
                },
                  error => console.log('add user failed')
                )
          }else{
            ( async() => {
              await this.delay(2000);
              this.dialog.closeAll()
              this.dialog.open(DialogueComponent,{data:{img:"./../../../assets/fail.png",msg:"This user name is already taken"}});
          })();
        }

      },
      err=>{}
    )

  }
}
