import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User, Test, File,
  USER,
  USER_REGISTER,
  USER_REGISTER_RESPONSE,
  USER_DATA_RESPONSE,
  SESSION_INFO,
  //USER_FIELDS,
  //USER_EDIT_RESPONSE,
  USER_EDIT,
  FILE_UPLOAD,
  ANONYMOUS_PRIMARY_PHOTO_UPLOAD,
  PRIMARY_PHOTO_UPLOAD,
  _RESPONSE,
  _FILE,
  _USER_DATA_RESPONSE,
  _USER_CREATE,
  _USER_EDIT,
  _USER_EDIT_RESPONSE,
  _DELETE_RESPONSE,
  _USER_RESPONSE
  
} from './../../../angular-backend/angular-backend';

import {

  ERROR_WRONG_SESSION_ID_NO_USER_DATA_BY_THAT_SESSION_ID

} from './../../../angular-backend/define';

type d = _USER_RESPONSE;

@Component({
  selector: 'register-page',
  templateUrl: './register.html',
  styleUrls:['./register.scss']
})
export class RegisterPage {
  //form: USER_REGISTER | USER_EDIT = {};
  //create: _USER_CREATE = <_USER_CREATE> {};
  //edit: _USER_EDIT = <_USER_EDIT> {};

  data = <d>{};
  
  //primary_photo_idx: number = null;

  //primary_photo: _FILE = <_FILE> {};

  form: FormGroup;

  constructor(
    private ngZone: NgZone,
    private fb: FormBuilder,
    public user: User,
    private router: Router,
    private file: File ) {



      if ( this.user.logged ) this.loadUserData();

      this.form = fb.group({
        name: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(32) ] ],
        email: [ '', [ Validators.required, this.emailValidator ] ],
        mobile: []
      });

      if ( ! this.user.logged ) {
        this.form.addControl( 'id', new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(32)] ) );
        this.form.addControl( 'password', new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(128)] ) );
      }
      
      this.form.valueChanges
        .debounceTime( 1000 )
        .subscribe( res => this.onValueChanged( res ) );
      
  }

  emailValidator(c: AbstractControl): { [key: string]: any } {
    if ( ! c.value ) return;
    if ( c.value.length < 8 ) {
      return { 'minlength' : '' };
    }
    if ( c.value.length > 64 ) {
      return { 'maxlength' : '' };
    }
    let re = new RegExp( /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ).test( <string> c.value );
    if ( re ) return;
    else return { 'malformed': '' };
  }

  formErrors = {
    id: '',
    password: '',
    name: '',
    email: ''
  };

  validationMessages = {
    id: {
      'required':      'ID is required.',
      'minlength':     'ID must be at least 3 characters long.',
      'maxlength':     'ID cannot be more than 32 characters long.'
    },
    name: {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 3 characters long.',
      'maxlength':     'Name cannot be more than 32 characters long.'
    },
    password: {
      'required': 'Password is required.',
      'minlength':     'Password must be at least 5 characters long.',
      'maxlength':     'Password cannot be more than 128 characters long.'
    },
    email: {
      'required':     'Email is required.',
      'minlength':     'Email must be at least 8 characters long.',
      'maxlength':     'Email cannot be more than 32 characters long.',
      'malformed':    'Email must be in valid format. valudator error'
    }
    
  };
  
  onValueChanged(data?: any) {
    if ( ! this.form ) return;
    const form = this.form;
    for ( const field in this.formErrors ) {
      this.formErrors[field] = '';        // clear previous error message (if any)
      const control = form.get(field);
      if ( control && control.dirty && ! control.valid ) {
        const messages = this.validationMessages[field];
        for ( const key in control.errors ) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  
  
  loadUserData(){
    
    this.user.data().subscribe( ( res: _USER_DATA_RESPONSE ) => {
      
      this.data = res.data.user;
      //this.form = this.userData;
      console.log(this.data);

      this.form.patchValue( this.data );

      //this.src_photo = this.file.src( { idx: this.userData.primary_photo_idx });
      //this.primary_photo = this.userData.primary_photo;
      console.log('loaduserdata::res', res);
    }, (err:_RESPONSE) => {
      console.log('err: ', err);
      if ( err.code == ERROR_WRONG_SESSION_ID_NO_USER_DATA_BY_THAT_SESSION_ID ) {
        this.user.deleteSessionInfo();
        alert("WARNING: Your login had invalidated. Please login again.");
        this.router.navigate( [ '/' ] );
      }
      else this.user.alert(err);
    });
  }



  onChangeFileUpload( fileInput ) {
    let file = fileInput.files[0];
    this.file.uploadPrimaryPhoto( file ).subscribe(res => {
      console.log("Register::onChangeFileUpload:: success: ", res);
      (<d>this.data).primary_photo = res.data;
    }, err => {
      this.file.alert(err);
    });
  }



  onClickRegister() {
    
    console.log( this.form.value );

    let register = <_USER_CREATE> this.form.value;

    if ( (<d>this.data).primary_photo ) register.file_hooks = [ (<d>this.data).primary_photo.idx ];
    this.user.register( register ).subscribe( res => {

      console.log('register: ', register);

    }, err => this.user.alert( err ) );
    
  }



  onClickUpdate() {
    let edit = <_USER_EDIT> this.form.value;
    this.user.edit( edit ).subscribe( ( res: _USER_EDIT_RESPONSE ) => {
      console.log( res );
      alert("User infomration updated");
    }, err => this.user.alert( err ) );
  }


  onClickDeletePhoto() {
    console.log("FileFormComponent::onClickDeleteFile(file): ", (<d>this.data).primary_photo);

    this.file.delete( (<d>this.data).primary_photo.idx ).subscribe( (res:_DELETE_RESPONSE) => {
        console.log("file delete: ", res);
        (<d>this.data).primary_photo = <any> {};
    }, err => this.file.alert(err) );
  }




}
