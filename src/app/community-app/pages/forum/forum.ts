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
  _POST_LIST_RESPONSE
} from './../../../angular-backend/angular-backend';

import { PostListComponent } from './../../components/post-list-component/post-list-component';

@Component({
  selector: 'forum-page',
  templateUrl: './forum.html',
  styleUrls:['./forum.css']
})
export class ForumPage {
  // postForm: POST_CREATE = {};
  // pagination = <Array<POST>> [];
  // posts: POST_LIST = [];
  post_config_id: string = null;

  postListResponse: _POST_LIST_RESPONSE = null;
  no_of_current_page = 1;
  no_of_total_items = 0;
  no_of_items_in_one_page: number = 5;
  no_of_pages_in_navigator = 3;


  // limitPerPage: number = 5;
  // currentPage: number = 1;
  // numberPerNav: number = 4;
  // totalRecord: number = 0;
  // comments = <Array<POST>>[];

  // searchForm = <POST>{};
  // searchQuery = <LIST>{};

  // searchChangeDebounce = new Subject();

  // photoIdxes: Array<number> = [];


  active: boolean = false;
  
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
      if ( params['post_config_id'] !== void 0 ) {
        this.post_config_id = params['post_config_id'];
        this.postListComponent.load( this.post_config_id );
      }
    });
  }



  onLoaded( res:_POST_LIST_RESPONSE ) {
    this.postListResponse = res;
    this.no_of_total_items = res.data.total;
  }


  onPageClick( page ) {
    console.log('onPageClick::page : ', page);
    this.no_of_current_page = page;
    this.postListComponent.load( this.post_config_id, this.no_of_current_page );
  }



}
