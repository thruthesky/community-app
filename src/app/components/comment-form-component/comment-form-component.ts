import { Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import { POST_CREATE,
  POST_CREATE_RESPONSE,
  PostData} from './../../angular-backend/angular-backend';


@Component({
  selector: 'comment-form-component',
  templateUrl: './comment-form-component.html'
})

export class CommentFormComponent implements OnInit{
  active: boolean = false;
  commentForm: POST_CREATE = {};

  @Input() parentIdx;
  @Input() configId: string;
  constructor( private post: PostData ) {}

  ngOnInit() {
    this.commentForm.parent_idx = this.parentIdx;
  }

  onClickCreateComment() {
    this.commentForm.post_config_id = this.configId;
    this.post.create( this.commentForm ).subscribe( (res: POST_CREATE_RESPONSE ) =>{
      console.log( res );
      this.active = false;
    }, err => this.post.alert( err ));
  }
  onClickActivateCommentBox() {
    this.active = true;
  }
}
