import { Component, OnInit } from '@angular/core';

import { User, Test, File,
  USER,
  USER_REGISTER, USER_REGISTER_RESPONSE,
  USER_DATA_RESPONSE,
  SESSION_INFO,
  USER_FIELDS,
  USER_EDIT_RESPONSE,
  USER_EDIT,
  FILE_UPLOAD
} from './../../angular-backend/angular-backend';

@Component({
  selector: 'register-page',
  templateUrl: './register.html',
  styleUrls:['./register.scss']
})
export class RegisterPage implements OnInit{
  form: USER_REGISTER | USER_EDIT = {};
  userData: USER_FIELDS = null;


  src_photo: string = null;
  // edit_src_photo: string = null;

  constructor(
    public user: User,
    private file: File ) {

  }
  ngOnInit(){
    if( this.user.logged ) this.loadData();
  }


    onClickRegister(){
      //this.form.file_hooks = [ this.user_photo_idx ];
      this.user.register(this.form).subscribe((res: USER_REGISTER_RESPONSE) => {
        console.info(res);
      }, err => {
        this.user.alert(err);
      });
    }

  loadData(){
    this.form = {};
    this.user.data().subscribe( ( res: USER_DATA_RESPONSE ) => {
      this.userData = res.data.user;
      this.form = this.userData;
      console.log(this.userData);
      this.src_photo = this.file.src( { idx: this.userData.primary_photo_idx });
      console.log('loaduserdata::res', res);
    }, err => this.user.alert(err));
  }
  onClickUpdate(){
    let editdata:USER_EDIT = {
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
      model_idx: this.userData.idx,
      code: 'primary_photo',
      unique: 'Y',
      finish: 'Y'
    };

    this.file.upload(req, file).subscribe(res => {
      console.log(res);
      
      this.src_photo = this.file.src( { idx: res.data.idx } );
    }, err => {
      console.log('error', err);
    });
  }
}
