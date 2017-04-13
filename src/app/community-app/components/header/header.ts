import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, USER_LOGOUT_RESPONSE } from './../../../angular-backend/angular-backend';
import { AppService } from './../../services/app-service';
import { Language } from '../../services/language';
@Component({
  selector: 'header-component',
  templateUrl: './header.html',
  styleUrls:['header.scss']
})
export class HeaderComponent implements OnInit {



  t;

 // i18n. 
 



      // this.t['home'] = this.ln.t( 'home' );
      // this.t['login'] = this.ln.t( 'login' );
      // this.t['logout'] = this.ln.t( 'logout' );
      // this.t['register'] = this.ln.t( 'register' );
      // this.t['profile'] = this.ln.t( 'profile' );
      // this.t['qna'] = this.ln.t( 'qna' );
      // this.t['test'] = this.ln.t( 'test' );
      // this.t['admin'] = this.ln.t( 'admin' );

  constructor (
    private appService: AppService,
    private router: Router,
    public user: User,
    public ln: Language
    ) {
      

      ln.languageCode = 'en';
      this.t = {
        home: ln.t('home')
      };
      this.t['qna'] = ln.t('qna');
      
      ['home', 'login', 'logout', 'register', 'profile', 'qna', 'test', 'admin'].map( v => {
        this.t[v] = ln.t( v );
      });



    console.log( this.t );
  }

  // t( code, args? ) {
  //   return this.ln.t( code, args );
  // }
  ngOnInit() {

  }
  onClickLogout() {
    this.router.navigate( [ '/' ] );
    this.user.logout().subscribe((res: USER_LOGOUT_RESPONSE) => {
      console.log(res);
    }, err => {
      this.user.alert(err);
    });
  }

  onClickProfile( url ) {
    this.appService.redirect( url );
  }

}
