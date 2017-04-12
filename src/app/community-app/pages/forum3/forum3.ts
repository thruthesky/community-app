import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import {
  PostData,
  _LIST,
  _POST_LIST_RESPONSE
} from './../../../angular-backend/angular-backend';
import {
    NO_OF_ITEMS_PER_PAGE
} from './../../../angular-backend/config';
import { PostListComponent } from './../../components/post-list-component/post-list-component';
import { PageScroll } from './../../services/page-scroll';
@Component({
  selector: 'forum3-page',
  templateUrl: './forum3.html',
  styleUrls:['./forum3.scss']
})
export class Forum3Page {
  
  post_config_id: string = null;
  
  lists: Array<_POST_LIST_RESPONSE> = [];

  postListResponse: _POST_LIST_RESPONSE = null;




  showPostForm: boolean = false;

    inLoading = false;
    noMorePosts = false;
  page = 0;
  watch;

  constructor(
    private activated: ActivatedRoute,
    private pageScroll: PageScroll,
    private postData: PostData )
  {

  }

  ngOnInit() {

    this.activated.params.subscribe( params => {
      if ( params['post_config_id'] !== void 0 ) {
        this.post_config_id = params['post_config_id'];
        
        this.load();
      }
    });


    this.watch = this.pageScroll.watch( 'section.posts', 350 ).subscribe( e => this.load() );

  }

  onLoaded( res:_POST_LIST_RESPONSE ) {
    this.postListResponse = res;
    console.log('res:', res);
  }

    load() {
        console.log("load() is called");
        if ( this.inLoading ) {
            console.log("but it's still loading previous page. so, just don't do anything");
            return;
        }
        if ( this.noMorePosts ) {
            console.log("but no more posts. so don't do anything");
            return;
        }
      this.inLoading = true;
      this.page++;
      console.log("loading page: ", this.page);

        let req: _LIST = {
            where: 'parent_idx=?',
            bind: '0',
            order: 'idx desc',
            page: this.page,
            limit: NO_OF_ITEMS_PER_PAGE,
            extra: {
                post_config_id: this.post_config_id,
                user: true,
                meta: true,
                file: true,
                comment: true
            }
        };

        this.postData.list( req ).subscribe((res: _POST_LIST_RESPONSE ) => {
            console.log('post list: ', res);
            this.inLoading = false;
            this.lists.push( res );
            if ( res.data.posts.length == 0 ) this.noMorePosts = true;
            else {
            }
        }, err => this.postData.alert(err));
    }


}
