import { Component } from '@angular/core';
import { User, USER_LOGIN, USER_LOGIN_RESPONSE } from './../../angular-backend/angular-backend';
@Component({
  selector: 'login-page',
  templateUrl: './login.html',
  styleUrls:['./login.css']
})
export class LoginPage {
  form: USER_LOGIN = <USER_LOGIN>{}
  constructor(
    private user: User
  ){}

  onClickLogin(){

    this.user.login(this.form).subscribe((res: USER_LOGIN_RESPONSE) => {
      console.log(res);
    }, err => {
      this.user.alert(err);
      console.log(err);
    });
  }
}
