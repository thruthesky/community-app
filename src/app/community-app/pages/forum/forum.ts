import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import {
  PostData,
  File,
  POST,
  UPLOAD,
  POST_LIST, POST_LIST_RESPONSE, LIST,
  POST_CREATE, POST_CREATE_RESPONSE,
  _POST_LIST_RESPONSE,
  _CONFIG
} from './../../../angular-backend/angular-backend';

import { PostListComponent } from './../../components/post-list-component/post-list-component';

@Component({
  selector: 'forum-page',
  templateUrl: './forum.html',
  styleUrls:['./forum.scss']
})
export class ForumPage {
  
  post_config_id: string = null;
  config: _CONFIG = <_CONFIG> {};

  postListResponse: _POST_LIST_RESPONSE = null;
  no_of_current_page = 1;
  no_of_total_items = 0;
  no_of_items_in_one_page: number = 2;
  no_of_pages_in_navigator = 3;



  active: boolean = false;


  //temp_page = this.no_of_current_page;
  
  @ViewChild('postListComponent') postListComponent: PostListComponent;

  constructor(
    private activated: ActivatedRoute,
    private ngbmodal: NgbModal,
    private file: File,
    private postData: PostData )
  {

  }

  ngOnInit() {

    this.activated.params.subscribe( params => {
      this.config = <_CONFIG> {};
      if ( params['post_config_id'] !== void 0 ) {
        this.post_config_id = params['post_config_id'];
        this.postListComponent.load( this.post_config_id, 1, this.no_of_items_in_one_page );
      }
    });
  }

  onLoaded( res:_POST_LIST_RESPONSE ) {
    this.postListResponse = res;

    console.log('res:', res);
    this.config = res.data.configs[0];
    this.no_of_total_items = res.data.total;
    this.no_of_current_page = res.data.page;
    this.no_of_items_in_one_page = res.data.limit;


  }


  onPageClick( page ) {
    console.log('onPageClick::page : ', page);
    //this.temp_page = page;
    this.postListComponent.load( this.post_config_id, page, this.no_of_items_in_one_page );
  }



}
