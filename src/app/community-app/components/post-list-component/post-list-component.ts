import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    PostData,
    // File,
    // NUMBERS,
    // _FILE, _FILES,
    // _POST_CREATE, _POST_CREATE_RESPONSE,
    _LIST, _POST_LIST_RESPONSE,
    _POST, _POSTS,
    _FILE
} from './../../../angular-backend/angular-backend';
import { ShareService } from './../../services/share-service';
@Component({
    selector: 'post-list-component',
    templateUrl: 'post-list-component.html'
})
export class PostListComponent implements OnInit {
    @Input() no_of_items_in_one_page: number = 0;
    constructor(
        public share: ShareService,
        private postData: PostData
    ) {

    }

    ngOnInit() {
    }


    load( id ) {
        this.share.post_config_id = id;
        
        let req: _LIST = {
            where: 'parent_idx=?',
            bind: '0',
            order: 'idx desc',
            extra: {
                post_config_id: this.share.post_config_id,
                user: true,
                meta: true,
                file: true,
                comment: true
            }
        };
        this.postData.list( req ).subscribe((res: _POST_LIST_RESPONSE ) => {
            console.log( res.data.posts );
            // res.data.posts.map( (p: _POST) => {
            //     p.files.map( (f: _FILE) => {
            //         f.url += "&resize=best-fit&width=100&height=100";
            //     });
            // });
            this.share.posts = res.data.posts;

      //console.info( 'loadSearchedData', res );
    //   this.pagination = res.data.posts;
    //   this.totalRecord = parseInt(res.data.total);
    //   console.log( 'data:: ' , this.pagination );
    }, err => this.postData.alert(err));
    }

}
