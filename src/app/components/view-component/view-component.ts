import { Component, Input, OnInit} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { POST,
          PostData,
          POST_LIST,
          POST_LIST_RESPONSE,
          LIST } from './../../angular-backend/angular-backend';

@Component({
  selector: 'view-component',
  templateUrl: './view-component.html',
  styleUrls:['./view-component.css']
})

export class ViewComponent implements OnInit{

  limitPerPage: number = 5;
  currentPage: number = 1;
  numberPerNav: number = 4;
  totalRecord: number = 0;

  pagination = <Array<POST>> [];

  searchForm = <POST>{};
  searchQuery = <LIST>{};




  @Input() parent_idx;
  @Input() post_config: string;


  constructor( private post: PostData ) {
    // this.loads();
  }

  ngOnInit() {
    // this.loads();
  this.onChangedSearch();
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


    this.searchQuery.where = cond;
    this.searchQuery.bind = bind;
    this.searchQuery.order= 'idx DESC';
    this.currentPage = 1;
    this.loadSearchedData();
  }

  loadSearchedData() {

    this.pagination = [];
    this.searchQuery.from = this.limitPerPage * this.currentPage - this.limitPerPage;
    this.searchQuery.limit = this.limitPerPage;

    this.searchQuery.extra = {
      'post_config_id' : this.post_config
    };
    this.searchQuery.where = `parent_idx = ${this.parent_idx} AND deleted IS NULL`;
    this.post.list(this.searchQuery).subscribe((res: POST_LIST_RESPONSE ) => {
      //console.info( 'loadSearchedData', res );
      this.pagination = res.data.posts;
      this.totalRecord = parseInt(res.data.total);
      console.log( 'comment:: ' , res.data );
    }, err => this.post.alert(err));
  }

  onClickSelectComment(idx) {
    // this.load(idx);
  }

  onClickDeleteComment( idx ) {
    this.post.delete( parseInt(idx) ).subscribe( res =>{
      console.log( res );
    }, err => console.error( err ) );
  }

}
