import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { PostData,
  POST,
  POST_LIST, POST_LIST_RESPONSE, LIST } from './../../angular-backend/angular-backend';

@Component({
  selector: 'forum-page',
  templateUrl: './forum.html',
  styleUrls:['./forum.css']
})
export class ForumPage {
  pagination = <Array<POST>> [];
  posts: POST_LIST = [];
  post_config_id: string = null;

  limitPerPage: number = 5;
  currentPage: number = 1;
  numberPerNav: number = 4;
  totalRecord: number = 0;
  comments = <Array<POST>>[];

  searchForm = <POST>{};
  searchQuery = <LIST>{};

  searchChangeDebounce = new Subject();




  constructor(
    activated: ActivatedRoute,
    private postData: PostData )
  {
    activated.params.subscribe( params => {
      if ( params['post_config_id'] !== void 0 ) {
        this.post_config_id = params['post_config_id'];
        this.onChangedSearch();

        this.searchChangeDebounce
          .debounceTime(300) // wait 300ms after the last event before emitting last event
          .subscribe(() => this.onChangedSearch());
      }
    });
  }

  onChangedSearch() {
    //console.log('onChangeSearch', this.searchForm);

    if (this.searchForm.title) {
      if (this.searchForm.title.length < 2) return;
    }
    if (this.searchForm.content) {
      if (this.searchForm.content.length < 2) return;
    }

    let cond = '';
    let bind = '';

    if (this.searchForm.idx) cond += "idx LIKE ? ";
    if (this.searchForm.idx) bind += `%${this.searchForm.idx}%`;

    if (this.searchForm.title) cond += cond ? "AND ( title LIKE ? ) " : "( title LIKE ?  )";
    if (this.searchForm.title) bind += bind ? `,%${this.searchForm.name}%,%${this.searchForm.title}%,%${this.searchForm.title}%` : `%${this.searchForm.title}%,%${this.searchForm.name}%,%${this.searchForm.name}%`;
    let req: POST_LIST = {
      order : 'idx DESC',
      extra: {
        'post_config_id' : this.post_config_id
      }
    };
    this.postData.list( req ).subscribe( (res: POST_LIST_RESPONSE) => {
      console.log(res);
      this.posts = res.data.posts;
    }, err => this.postData.alert( err ) );


    this.searchQuery.where = cond;
    this.searchQuery.bind = bind;
    this.searchQuery.order= 'idx DESC';
    this.currentPage = 1;
    this.loadSearchedData();
  }


  onPageClick($event) {
    //console.log('onPageClick::$event',$event);
    this.currentPage = $event;
    this.loadSearchedData();
  }

  loadSearchedData() {

    this.pagination = [];
    this.searchQuery.from = this.limitPerPage * this.currentPage - this.limitPerPage;
    this.searchQuery.limit = this.limitPerPage;
    this.searchQuery.extra = {
      'post_config_id' : this.post_config_id,
    };
    this.searchQuery.where = "parent_idx = 0";
    this.postData.list(this.searchQuery).subscribe((res: POST_LIST_RESPONSE ) => {
      //console.info( 'loadSearchedData', res );
      this.pagination = res.data.posts;
      this.totalRecord = parseInt(res.data.total);
      console.log( 'data:: ' , this.pagination );
    }, err => this.postData.alert(err));
  }






}
