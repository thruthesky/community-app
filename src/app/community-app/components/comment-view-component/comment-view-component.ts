import { Component, Input } from '@angular/core';
import { AppService } from './../../services/app-service';
import { PostComment } from './../../../angular-backend/angular-backend';
import {
    _COMMENT
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

    onClickLike() {

        // from here.
        this.postComment.like( this.comment.idx ).subscribe( res => {
            console.log('res: ', res);
        }, err => this.postComment.alert( err ) );
    }

    // onClickReply() {
    //     console.log('this.showCommentForm:', this.showCommentForm);
    //     this.showCommentForm = ! this.showCommentForm;
    // }
}