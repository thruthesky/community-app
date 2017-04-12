import { Component } from '@angular/core';
import { PostData, _LIST, _POST_LIST_RESPONSE } from './../../../angular-backend/angular-backend';
@Component({
  selector: 'home-page',
  templateUrl: './home.html'
})
export class HomePage {

  list: _POST_LIST_RESPONSE = <_POST_LIST_RESPONSE>{};

  constructor( private postData: PostData  ) {

    let req: _LIST = {
      where: 'parent_idx=? AND first_image_idx>?',
      bind: '0,0',
      order: 'idx desc',
      page: 1,
      limit: 3,
      extra: {
        user: true,
        meta: true,
        file: true,
        comment: true
      }
    };

    this.postData.list( req ).subscribe((res: _POST_LIST_RESPONSE ) => {
      console.log('post list: ', res);
      this.list = res;
    }, err => this.postData.alert(err));

  }

}
