import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginInvalid: boolean;
  constructor(
    private  router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.get("username").value == "rod20" && this.form.get("password").value == "12345"){
      localStorage.setItem("username","rod20");
      localStorage.setItem("password","12345");
      this.router.navigateByUrl("/user");
    }
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.get("username").value == "rod20" && this.form.get("password").value == "12345") {
      this.router.navigateByUrl("/user");
    }
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}
