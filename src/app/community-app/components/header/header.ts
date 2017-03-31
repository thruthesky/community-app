import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, USER_LOGOUT_RESPONSE } from './../../../angular-backend/angular-backend';
@Component({
  selector: 'header-component',
  templateUrl: './header.html',
  styleUrls:['header.scss']
})
export class HeaderComponent implements OnInit{
  usertype;
  constructor( 
    private router: Router,
    public user: User ) {

  }
  ngOnInit(){
      // if( ! this.user.logged ) return;
      // this.user.data().subscribe( res =>{
      //   this.usertype = res.data.user.id;
      // });
  }
  onClickLogout() {
    this.router.navigate( [ '/' ] );
    this.user.logout().subscribe((res: USER_LOGOUT_RESPONSE) => {
      console.log(res);
    }, err => {
      this.user.alert(err);
    });
  }
}
