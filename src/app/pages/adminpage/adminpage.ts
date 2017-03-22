import { Component } from '@angular/core';
import { User, USER_LOGOUT_RESPONSE, USER_LIST_RESPONSE, PostConfig } from './../../angular-backend/angular-backend';
import { CreateConfigComponent } from './../../components/modals/create_postconfig/create';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'admin-page',
  templateUrl: './adminpage.html',
  styleUrls:['./adminpage.scss']
})
export class AdminPage{
  users;
  postConfig;
  constructor(
    private user: User,
    private postconfig: PostConfig,
    private modalService: NgbModal
  ){
    this.getUsers();
    this.getPostConfig();
  }

  getUsers(){
    this.user.list({order: 'idx ASC'}).subscribe((res: USER_LIST_RESPONSE) => {
      this.users = res.data.users;
      console.info('users: ', res);
    }, err => {
      alert(err);
      console.error(err);
    });
  }

  getPostConfig(){
    this.postconfig.list({order: 'idx ASC'}).subscribe( res =>{
      this.postConfig = res.data.configs;
      console.info('config: ', res );
    }, err =>{
      alert( err );
      console.error( err );
    })
  }

  onClickShowPostConfigModal() {
    const modalRef = this.modalService.open( CreateConfigComponent );
  }
}
