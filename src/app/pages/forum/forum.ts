import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostData,
  POST_CREATE, POST,
  POST_LIST, POST_LIST_RESPONSE } from './../../angular-backend/angular-backend';
@Component({
  selector: 'forum-page',
  templateUrl: './forum.html',
  styleUrls:['forum.scss']
})
export class ForumPage {


  post_config_id: string = null;


  constructor(
    activated: ActivatedRoute,
    private postData: PostData )
  {
    activated.params.subscribe( params => {
      if ( params['post_config_id'] !== void 0 ) {
        this.post_config_id = params['post_config_id'];
        this.loadPage();
      }
    });
  }


  loadPage() {


    let req: POST_LIST = {
      extra: {
        'post_config_id' : this.post_config_id
      }
    };
    this.postData.list( req ).subscribe( (res: POST_LIST_RESPONSE) => {
      console.log(res);
    }, err => this.postData.alert( err ) );

  }



}
