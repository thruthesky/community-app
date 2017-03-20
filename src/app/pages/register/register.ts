import { Component } from '@angular/core';
import { Backend, User, Test, File, PostConfig, PostData,
  USER_REGISTER, USER_REGISTER_RESPONSE,
  USER_DATA_RESPONSE,
  SESSION_INFO,
  USER_FIELDS,
} from './../../angular-backend/angular-backend';
@Component({
  selector: 'register-page',
  templateUrl: './register.html',
  styleUrls:['./register.css']
})
export class RegisterPage{
  form = <USER_REGISTER> {};

  constructor(
    private backend: Backend,
    private user: User,
    private post: PostData,
    private file: File ) {}


    onClickRegister(){
      this.user.register(this.form).subscribe((res: USER_REGISTER_RESPONSE) => {
        console.info(res);
      }, err => {
        this.user.alert(err);
      });
    }
}
