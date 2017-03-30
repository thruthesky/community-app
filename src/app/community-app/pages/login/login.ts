import { Component, OnInit } from '@angular/core';
import { User, USER_LOGIN, USER_LOGIN_RESPONSE } from './../../../angular-backend/angular-backend';
import { Router } from '@angular/router';
@Component({
  selector: 'login-page',
  templateUrl: './login.html',
  styleUrls:['./login.scss']
})
export class LoginPage implements OnInit{
  form: USER_LOGIN = <USER_LOGIN>{}
  constructor(
    private user: User,
    private router: Router
  ){

  }
  ngOnInit() {
    this.checkLogin();
  }
  checkLogin(){
      if( this.user.logged ) this.router.navigate(['']);
  }
  onClickLogin(){

    this.user.login(this.form).subscribe((res: USER_LOGIN_RESPONSE) => {
      console.log(res);
      this.router.navigate(['']);
    }, err => {
      this.user.alert(err);
      console.log(err);
    });
  }
}
