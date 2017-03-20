import { Component } from '@angular/core';
import { Backend, User, Test, File, PostConfig, PostData,
  USER_EDIT,
  USER_DATA,
  USER_DATA_RESPONSE,
  USER_EDIT_RESPONSE,
  SESSION_INFO,
  USER_FIELDS,
} from './../../angular-backend/angular-backend';
@Component({
  selector: 'profile-page',
  templateUrl: './profile.html',
  styleUrls:['./profile.css']
})
export class ProfilePage{
  form: USER_EDIT = <USER_EDIT> {};

  constructor(
    private backend: Backend,
    private user: User,
    private post: PostData,
    private file: File ) {
    this.loadData();
  }

    loadData(){

      this.user.data().subscribe( ( res: USER_DATA_RESPONSE ) => {
        this.form = res.data.user;
        console.log('onClickLoadData::res', res);
      }, err => this.user.alert(err));
    }
    onClickUpdate(){
      this.user.edit( this.form ).subscribe( ( res: USER_EDIT_RESPONSE ) => {
        console.log( res );
      }, err => this.user.alert( err ) );
    }

    onClickResign(){

    }
}
