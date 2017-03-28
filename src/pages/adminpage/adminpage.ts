import { Component } from '@angular/core';
import { User, USER_LOGOUT_RESPONSE, USER_LIST_RESPONSE, PostConfig, USER, File } from './../../app/angular-backend/angular-backend';
import { CreateConfigComponent } from './../../components/modals/create_postconfig/create';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'admin-page',
  templateUrl: './adminpage.html',
  styleUrls:['./adminpage.css']
})
export class AdminPage{
  users;
  postConfig;
  constructor(
    private user: User,
    private postconfig: PostConfig,
    private ngbmodal: NgbModal,
    private file: File
  ){
    this.getFiles();
    this.getUsers();
    this.getPostConfig();
  }

  getUsers(){
    this.user.list().subscribe((res: USER_LIST_RESPONSE) => {
      this.users = res.data.users;
      console.info('users: ', res );
    }, err => {
      alert(err);
      console.error(err);
    });
  }

  getFiles() {
    this.file.list().subscribe( res =>{
      console.info( 'files : ' , res );
    })
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
    const modalRef = this.ngbmodal.open( CreateConfigComponent );
  }
}
