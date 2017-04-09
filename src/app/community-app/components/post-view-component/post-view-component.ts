import { Component, Input } from '@angular/core';
import { AppService } from './../../services/app-service';
import {
    PostData,
    _POST,
    _VOTE_RESPONSE,
    _REPORT_RESPONSE
} from './../../../angular-backend/angular-backend';
@Component({
    selector: 'post-view-component',
    templateUrl: 'post-view-component.html'
})
export class PostViewComponent {
    @Input() post: _POST;
    showPostEditForm: boolean = false;
    showCommentForm: boolean = false;

    constructor( public appService: AppService, private postData: PostData ) {}

    onClickLike( choice ) {
        this.postData.vote( this.post.idx, choice ).subscribe( (res:_VOTE_RESPONSE) => {
            console.log('res: ', res);
            this.post.vote_good = res.data.vote_good;
            this.post.vote_bad = res.data.vote_bad;
        }, err => this.postData.alert( err ) );
    }

    onClickReport() {
        this.postData.report( this.post.idx ).subscribe( (res:_REPORT_RESPONSE) => {
            console.log('res: ', res);
            this.post.report = res.data.report;
        }, err => this.postData.alert( err ) );
    }

    get myPost() {
        return this.post.user.id == this.postData.info.id;
    }


}