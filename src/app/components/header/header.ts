import { Component, OnInit } from '@angular/core';
import { User, USER_LOGOUT_RESPONSE } from './../../angular-backend/angular-backend';
@Component({
  selector: 'header-component',
  templateUrl: './header.html',
  styleUrls:['header.css']
})
export class HeaderComponent implements OnInit{
  isLogged = null;
  usertype;
  constructor( private user: User ){

  }
  ngOnInit(){
      if( ! this.user.logged ) return;
      this.user.data().subscribe( res =>{
        this.usertype = res.data.user.id;
      });
  }
  onClickLogout(){
    this.user.logout().subscribe((res: USER_LOGOUT_RESPONSE) => {
      console.log(res);
    }, err => {
      this.user.alert(err);
    });
  }
}
