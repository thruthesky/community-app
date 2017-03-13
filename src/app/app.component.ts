import { Component } from '@angular/core';
import { Backend, User, Test,
  USER, USER_LOGIN, USER_LOGIN_RESPONSE, USER_LIST_RESPONSE,
  USER_LOGOUT_RESPONSE,
  USER_REGISTER, USER_REGISTER_RESPONSE,
  SESSION_INFO
} from './angular-backend/angular-backend.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';


  _id: string = null;
  _password: string = null;

  newUsers: Array<USER> = null;
  form = <USER_REGISTER> {};

  info = <SESSION_INFO> {};

  constructor(
//    test: Test,
    private backend: Backend,
    private user: User
  )
  {
    // this.onClickLogin( 'admin', 'admin' );
    this.loadNewlyRegisteredUsers();
    
  }

  loadNewlyRegisteredUsers() {

    this.user.list( { order: 'idx DESC' } ).subscribe( (res: USER_LIST_RESPONSE) => {
      this.newUsers = res.data.users;
      console.info(res);
    }, err => {
      alert( err );
      console.error(err);
    });
  }

  onClickLogin( id, password ) {
    let req: USER_LOGIN = {
      id: id,
      password: password
    };
    this.user.login( req ).subscribe( (res: USER_LOGIN_RESPONSE ) => {
      console.log( res );
      this.info = this.user.getSessionInfo();
    }, err => {
      this.user.alert( err );
      console.log(err);
    });
  }

  onClickLogout() {
    this.user.logout().subscribe( (res: USER_LOGOUT_RESPONSE) => {
      console.log( res );
    }, err => {
      this.user.alert( err );
    });
  }

  onClickRegister() {
    this.user.register( this.form ).subscribe( (res: USER_REGISTER_RESPONSE) => {
      console.info( res );
      this.info = this.user.getSessionInfo();
    }, err => {
      this.user.alert(err);
    });
  }

}
