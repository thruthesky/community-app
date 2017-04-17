import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    PostData,
    _POST,
    _POST_DATA_RESPONSE
} from './../../../angular-backend/angular-backend';
@Component({
  selector: 'post-view-page',
  templateUrl: './post-view.html',
  styleUrls:['./post-view.scss']
})
export class PostViewPage {
  post:_POST = null;
  constructor(
      private activatedRoute: ActivatedRoute,
    private postData: PostData,
    public router: Router
  ) {
      
    this.activatedRoute.params.subscribe( params => {
        console.log('params:', params);
      if ( params['post_idx'] !== void 0 ) {
          this.postData.data( params['post_idx'] ).subscribe( (res:_POST_DATA_RESPONSE) => {
              console.log('res:', res);
            this.post = res.data.post;
          }, err => this.postData.alert(err) );
      }
    });

  }
}
