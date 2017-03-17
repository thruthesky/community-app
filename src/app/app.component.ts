import { Component, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Http } from '@angular/http';
import { File } from './angular-backend/file'



import { Backend, User, Test,
  USER, USER_LOGIN, USER_LOGIN_RESPONSE, USER_LIST_RESPONSE,
  USER_EDIT, USER_EDIT_RESPONSE,
  USER_LOGOUT_RESPONSE,
  USER_REGISTER, USER_REGISTER_RESPONSE,
  USER_DATA_RESPONSE,
  SESSION_INFO,
  USER_LIST, USER_FIELDS,
  FILE_UPLOAD,
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

  limitPerPage: number = 5;
  currentPage: number = 1;
  numberPerNav: number = 4;
  totalRecord: number = 0;

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


  paginationClass = {
    ul: 'pagination',
    li: 'page-item',
    a: 'page-link',
    active: 'active',
    pageIn: 'page-indicator'
  };

  percentage: number = 0;

  constructor(//    test: Test,
              private http: Http,
              private backend: Backend,
              private user: User,
              private ngZone: NgZone,
              private file: File) {
    // this.onClickLogin( 'admin', 'admin' );
    this.loadNewlyRegisteredUsers();
    this.onChangedSearch();


    this.searchChangeDebounce
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .subscribe(() => this.onChangedSearch());


  }

  loadNewlyRegisteredUsers() {

    this.user.list({order: 'idx DESC'}).subscribe((res: USER_LIST_RESPONSE) => {
      this.newUsers = res.data.users;
      console.info('loadNewlyRegisteredUsers', res);
    }, err => {
      alert(err);
      console.error(err);
    });
  }

  onClickLogin(id, password) {
    let req: USER_LOGIN = {
      id: id,
      password: password
    };
    this.user.login(req).subscribe((res: USER_LOGIN_RESPONSE) => {
      console.log(res);
    }, err => {
      this.user.alert(err);
      console.log(err);
    });
  }

  onClickLogout() {
    this.user.logout().subscribe((res: USER_LOGOUT_RESPONSE) => {
      console.log(res);
    }, err => {
      this.user.alert(err);
    });
  }

  onClickRegister() {
    this.user.register(this.form).subscribe((res: USER_REGISTER_RESPONSE) => {
      console.info(res);
    }, err => {
      this.user.alert(err);
    });
  }

  onClickLoadData(id?: string) {
    this.user.data(id).subscribe((res: USER_DATA_RESPONSE) => {
      let data = res.data.user;
      this.edit.name = data.name;
      this.edit.email = data.email;
      this.edit.gender = data.gender;
      this.edit.id = data.id;
      /** this.edit = res.data.user; **/
      //console.log('onClickLoadData::res', res);
    }, err => this.user.alert(err));
  }


  onClickUpdateProfile() {
    //console.log('onClickUpdateProfile::this.edit', this.edit );
    this.user.edit(this.edit).subscribe((res: USER_EDIT_RESPONSE) => {
      console.log(res);
    }, err => this.user.alert(err));
  }

  onChangeSearch() {
    this.searchChangeDebounce.next();
  }

  onChangedSearch() {
    //console.log('onChangeSearch', this.searchForm);

    if (this.searchForm.id) {
      if (this.searchForm.id.length < 2) return;
    }
    if (this.searchForm.name) {
      if (this.searchForm.name.length < 2) return;
    }
    if (this.searchForm.email) {
      if (this.searchForm.email.length < 2) return;
    }

    let cond = '';
    let bind = '';

    if (this.searchForm.id) cond += "id LIKE ? ";
    if (this.searchForm.id) bind += `%${this.searchForm.id}%`;

    if (this.searchForm.name) cond += cond ? "AND ( name LIKE ? OR middle_name LIKE ? OR last_name LIKE ? ) " : "( name LIKE ? OR middle_name LIKE ? OR last_name LIKE ? )";
    if (this.searchForm.name) bind += bind ? `,%${this.searchForm.name}%,%${this.searchForm.name}%,%${this.searchForm.name}%` : `%${this.searchForm.name}%,%${this.searchForm.name}%,%${this.searchForm.name}%`;

    if (this.searchForm.email) cond += cond ? "AND email LIKE ? " : "email LIKE ? ";
    if (this.searchForm.email) bind += bind ? `,%${this.searchForm.email}%` : `%${this.searchForm.email}%`;

    this.searchQuery.where = cond;
    this.searchQuery.bind = bind;
    //console.log('onChangeSearch::searchQuery', this.searchQuery);
    this.currentPage = 1;
    this.loadSearchedData();
  }


  loadSearchedData() {

    this.paginationUsers = [];
    this.searchQuery.from = this.limitPerPage * this.currentPage - this.limitPerPage;
    this.searchQuery.limit = this.limitPerPage;
    this.user.list(this.searchQuery).subscribe((res: USER_LIST_RESPONSE) => {
      //console.info( 'loadSearchedData', res );
      this.paginationUsers = res.data.users;
      this.totalRecord = parseInt(res.data.total);
      //this.currentPage = 1;
      //console.log('total: ', this.totalRecord);
      //this.showPagination();
    }, err => this.user.alert(err));
  }

  onPageClick($event) {
    //console.log('onPageClick::$event',$event);
    this.currentPage = $event;
    this.loadSearchedData();
  }

  onChangeFile(fileInput) {

    console.log("file changed: ", fileInput);
    let file = fileInput.files[0];
    console.log("file: ", file);
    let req: FILE_UPLOAD = {
      model: 'abc',
      model_idx: 123,
      code: 'qwe'
    };

    this.file.upload(req, file).subscribe(res => {
      console.log(res);
    }, err => {
      console.log('error', err);
    });

    /*
     let formData = new FormData();
     formData.append( 'route', 'upload' );
     formData.append( 'model', 'def' );
     formData.append( 'model_idx', '456' );
     formData.append( 'code', 'purple' );
     formData.append( 'userfile', file, file.name);
     this.http.post( 'http://localhost/www/backend/index.php', formData).subscribe(res=>{
     console.info("file upload success: ", res);
     }, err => {
     console.error(err);
     })

     }*/

    // onClickForumCreate() {
    //   this.
    // }

  }
}
