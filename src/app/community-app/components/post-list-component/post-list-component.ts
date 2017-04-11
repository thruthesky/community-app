import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
import { AppService } from './../../services/app-service';
@Component({
    selector: 'post-list-component',
    templateUrl: 'post-list-component.html'
})
export class PostListComponent implements OnInit {
    @Output() loaded = new EventEmitter<_POST_LIST_RESPONSE>();
    constructor(
        public appShare: AppService,
        private postData: PostData
    ) {

    }

    ngOnInit() {
    }


    load( id, page = 1, limit = 10 ) {
        this.appShare.post_config_id = id;
        
        let req: _LIST = {
            where: 'parent_idx=?',
            bind: '0',
            order: 'idx desc',
            page: page,
            limit: limit,
            extra: {
                post_config_id: this.appShare.post_config_id,
                user: true,
                meta: true,
                file: true,
                comment: true
            }
        };
        this.postData.list( req ).subscribe((res: _POST_LIST_RESPONSE ) => {
            // console.log( res );
            // res.data.posts.map( (p: _POST) => {
            //     p.files.map( (f: _FILE) => {
            //         f.url += "&resize=best-fit&width=100&height=100";
            //     });
            // });
            if ( res && res.data && res.data.posts ) {
                this.appShare.posts = res.data.posts;
                this.appShare.posts.map( (post: _POST) => {
                    //this.appShare.sanitizeContent( post );
                });
            }

            this.loaded.emit( res );

        //console.info( 'loadSearchedData', res );
        //   this.pagination = res.data.posts;
        //   this.totalRecord = parseInt(res.data.total);
        //   console.log( 'data:: ' , this.pagination );
        }, err => this.postData.alert(err));
    }

}
