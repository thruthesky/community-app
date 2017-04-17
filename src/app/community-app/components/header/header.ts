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









  constructor (
    private appService: AppService,
    private router: Router,
    public user: User,
    public ln: Language
    ) {

   
  
      ln.languageCode = 'ko';
      this.t = {
        home: ln.t('home')
      };
      this.t['qna'] = ln.t('qna');
      
      ['home', 'login', 'logout', 'register', 'profile', 'qna', 'test',
        'admin', 'menu', 'change_password']
      .map( v => {
        this.t[v] = ln.t( v );
      });



    //console.log( this.t );
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
