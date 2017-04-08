import { Component, Input } from '@angular/core';
import { AppService } from './../../services/app-service';
import { PostComment } from './../../../angular-backend/angular-backend';
import {
    _COMMENT,
    _VOTE_RESPONSE,
    _REPORT_RESPONSE
} from '../../../angular-backend/interface';
@Component({
    selector: 'comment-view-component',
    templateUrl: 'comment-view-component.html'
})
export class CommentViewComponent {
    @Input() comment: _COMMENT;


    mode: 'create' | 'edit' | '' = '';


    constructor(
        private appService: AppService,
        private postComment: PostComment
    ) {

    }

    ngOnInit() {
        //this.appService.sanitizeContent( this.comment );
    }

    onClickLike( choice ) {
        this.postComment.vote( this.comment.idx, choice ).subscribe( (res:_VOTE_RESPONSE) => {
            console.log('res: ', res);
            this.comment.vote_good = res.data.vote_good;
            this.comment.vote_bad = res.data.vote_bad;
        }, err => this.postComment.alert( err ) );
    }
    onClickReport() {
        this.postComment.report( this.comment.idx ).subscribe( (res:_REPORT_RESPONSE) => {
            console.log('res: ', res);
            this.comment.report = res.data.report;
        }, err => this.postComment.alert( err ) );
    }


}