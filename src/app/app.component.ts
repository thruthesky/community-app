import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import { Backend, User, Test,
  USER, USER_LOGIN, USER_LOGIN_RESPONSE, USER_LIST_RESPONSE,
  USER_EDIT, USER_EDIT_RESPONSE,
  USER_LOGOUT_RESPONSE,
  USER_REGISTER, USER_REGISTER_RESPONSE,
  USER_DATA_RESPONSE,
  SESSION_INFO,
  USER_LIST, USER_FIELDS,
  CONFIG
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

  newUsers = <Array<USER>> [];

  paginationUsers = <Array<USER>> [];
  searchForm = <USER>{};
  searchQuery = <USER_LIST>{};

  form = <USER_REGISTER> {};
  edit = <USER_EDIT> {};

  info = <SESSION_INFO> {};
  //
  forum = <CONFIG> {};


  searchChangeDebounce = new Subject();
  constructor(
//    test: Test,
private backend: Backend,
private user: User
  )
  {
    // this.onClickLogin( 'admin', 'admin' );
    this.loadNewlyRegisteredUsers();
    this.onChangedSearch();


    this.searchChangeDebounce
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .subscribe( () => this.onChangedSearch() );
  }

  loadNewlyRegisteredUsers() {

    this.user.list( { order: 'idx DESC' } ).subscribe( (res: USER_LIST_RESPONSE) => {
      this.newUsers = res.data.users;
      console.info( 'loadNewlyRegisteredUsers', res);
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
    }, err => {
      this.user.alert(err);
    });
  }

  onClickLoadData( id? : string) {
    this.user.data( id ).subscribe( (res: USER_DATA_RESPONSE) => {
      let data = res.data.user;
      this.edit.name = data.name;
      this.edit.email = data.email;
      this.edit.gender = data.gender;
      this.edit.id = data.id;
      /** this.edit = res.data.user; **/
      console.log('onClickLoadData::res', res);
    }, err => this.user.alert( err ) );
  }


  onClickUpdateProfile() {
    console.log('onClickUpdateProfile::this.edit', this.edit );
    this.user.edit( this.edit ).subscribe( (res:USER_EDIT_RESPONSE) => {
      console.log(res);
    }, err => this.user.alert( err ) );
  }

  onChangeSearch() {
    this.searchChangeDebounce.next();
  }

  onChangedSearch() {
    console.log('onChangeSearch', this.searchForm);

    if ( this.searchForm.id ) { if ( this.searchForm.id.length < 2 ) return; }
    if ( this.searchForm.name ) { if ( this.searchForm.name.length < 2 ) return; }
    if ( this.searchForm.email ) { if ( this.searchForm.email.length < 2 ) return; }

    let cond = '';
    let bind = '';

    if( this.searchForm.id ) cond += "id LIKE ? ";
    if( this.searchForm.id ) bind += `%${this.searchForm.id}%`;

    if( this.searchForm.name ) cond += cond ? "AND ( name LIKE ? OR middle_name LIKE ? OR last_name LIKE ? ) " : "( name LIKE ? OR middle_name LIKE ? OR last_name LIKE ? )";
    if( this.searchForm.name ) bind += bind ? `,%${this.searchForm.name}%,%${this.searchForm.name}%,%${this.searchForm.name}%` : `%${this.searchForm.name}%,%${this.searchForm.name}%,%${this.searchForm.name}%`;

    if( this.searchForm.email ) cond += cond ? "AND email LIKE ? " : "email LIKE ? ";
    if( this.searchForm.email ) bind += bind ? `,%${this.searchForm.email}%` : `%${this.searchForm.email}%`;


    console.log('CONDITION::', cond);

    console.log('BINDING::', bind);

    this.searchQuery.where = cond;
    this.searchQuery.bind = bind;
    console.log('onChangeSearch::searchQuery', this.searchQuery);
    this.loadSearchedData();
  }

  limit = 5;
  currentPage = 1;
  numberPerNav = 4;
  total = 0;

  loadSearchedData() {

    this.paginationUsers = [];
    this.searchQuery.from = this.limit*this.currentPage - this.limit;
    this.searchQuery.limit = this.limit;
    this.user.list( this.searchQuery ).subscribe( (res:USER_LIST_RESPONSE) => {
      console.info( 'loadSearchedData', res );
      this.paginationUsers = res.data.users;
      this.total = parseInt( res.data.total );
      console.log('total: ', this.total);
      //this.showPagination();
    }, err => this.user.alert( err ) );


  }

  onPageClick($event) {
    console.log('onPageClick::$event',$event);
    this.currentPage = $event;
    this.loadSearchedData();
  }

  /**
   *
   numbers = [];
   currentPage = 1;
   total = 0;
   limit = 5;
   totalPage = 0;
   totalDisplayed = 3;
   showPagination() {
    this.totalPage = Math.ceil(this.total / this.limit);
    //console.log('showPagination::this.totalPage', this.totalPage);
    this.numbers = Array.from(new Array(this.totalPage), (x,i) => i+1);
  }
   nextPage(){
    this.currentPage += 1;
    this.loadSearchedData();
  }
   previousPage(){
    this.currentPage -= 1;
    this.loadSearchedData();
  }
   gotoPage( page ) {
    this.currentPage = page;
    this.loadSearchedData();
  }
   gotoLast() {
    this.currentPage = this.totalPage;
    this.loadSearchedData();
  }
   gotoFirst() {
    this.currentPage = 1;
    this.loadSearchedData();
  }

   ***/


  // onClickForumCreate() {
  //   this.
  // }

}
