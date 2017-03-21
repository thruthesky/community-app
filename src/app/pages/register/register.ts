import { Component, OnInit } from '@angular/core';
import { Backend, User, Test, File, PostConfig, PostData,
  USER_REGISTER, USER_REGISTER_RESPONSE,
  USER_DATA_RESPONSE,
  SESSION_INFO,
  USER_FIELDS,
  USER_EDIT_RESPONSE,
  USER_EDIT,
  FILE_UPLOAD
} from './../../angular-backend/angular-backend';
import {USER} from "../../angular-backend/interface";
@Component({
  selector: 'register-page',
  templateUrl: './register.html',
  styleUrls:['./register.css']
})
export class RegisterPage implements OnInit{
  form = <USER_REGISTER>{};
  user_data;
  user_photo_idx: number = 0;
  src_photo: string = null;
  edit_src_photo: string = null;

  constructor(
    private backend: Backend,
    private user: User,
    private post: PostData,
    private file: File ) {

  }
  ngOnInit(){
    if( this.user.logged ) this.loadData();
  }


    onClickRegister(){
      this.form.file_hooks = [ this.user_photo_idx ];
      this.user.register(this.form).subscribe((res: USER_REGISTER_RESPONSE) => {
        console.info(res);
      }, err => {
        this.user.alert(err);
      });
    }
  loadData(){
    this.form = <USER_EDIT>{};
    this.user.data().subscribe( ( res: USER_DATA_RESPONSE ) => {
      this.form = res.data.user;
      this.user_data = res.data.user;
      this.edit_src_photo = this.file.src( { idx: this.user_data.primary_photo_idx });
      console.log('loaduserdata::res', res);
    }, err => this.user.alert(err));
  }
  onClickUpdate(){
    let editdata = <USER_EDIT>{
      email     : this.form.email,
      name      : this.form.name,
      nickname  : this.form.nickname
    };
    this.user.edit( editdata ).subscribe( ( res: USER_EDIT_RESPONSE ) => {
      console.log( res );
    }, err => this.user.alert( err ) );
  }

  onChangeFileUpload( fileInput ) {

    let file = fileInput.files[0];
    console.log("file: ", file);
    let req: FILE_UPLOAD = {
      model: 'user',
      code: 'primary_photo',
      unique: 'Y',
      finish: 'Y'
    };

    this.file.upload(req, file).subscribe(res => {
      console.log(res);
      this.user_photo_idx = res.data.idx;
      this.src_photo = this.file.src( { idx: res.data.idx } );
    }, err => {
      console.log('error', err);
    });
  }

  onEditFile( fileInput ) {
    console.log("file changed: ", fileInput);
    let file = fileInput.files[0];
    console.log("file: ", file);
    let req: FILE_UPLOAD = {
      model: 'user',
      model_idx: this.user_data.idx,
      code: 'primary_photo',
      unique: 'Y',
      finish: 'Y'
    };

    this.file.upload(req, file).subscribe(res => {
      console.log(res);
      this.user_photo_idx = res.data.idx;
      this.edit_src_photo = this.file.src( { idx: res.data.idx } );
    }, err => {
      console.log('error', err);
    });
  }
}
