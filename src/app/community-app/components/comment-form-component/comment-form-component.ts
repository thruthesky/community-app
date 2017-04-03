import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//import 'rxjs/add/operator/debounceTime';
import { 
  PostComment,
  File,
  _POST,
  _COMMENT,
  _FILE,
  _COMMENT_CREATE, _COMMENT_CREATE_RESPONSE,
  _COMMENT_EDIT, _COMMENT_EDIT_RESPONSE,
  UPLOAD, FILE_UPLOAD_RESPONSE
} from './../../../angular-backend/angular-backend';
import { ShareService } from './../../services/share-service';
@Component({
  selector: 'comment-form-component',
  templateUrl: './comment-form-component.html'
})

export class CommentFormComponent implements OnInit {
  
  @Input() mode: 'create' | 'edit' | '';
  
  @Input() parent_idx;          /// only for creating comment.
  @Input() comment: _COMMENT = <_COMMENT> {};   /// only for editing comment.

  @Output() cancel = new EventEmitter<void>();
  @Output() created = new EventEmitter<_COMMENT>();
  @Output() edited = new EventEmitter<_COMMENT>();
  
  
  
  formGroup: FormGroup;
  files: Array<_FILE> = [];



  constructor(
    public share: ShareService,
    private fb: FormBuilder,
    private postComment: PostComment,
    private file: File
  ) {
  }

  ngOnInit() {
    
    this.createForm();
  }

  createForm() {
    if ( this.mode == 'create' ) {
      this.formGroup = this.fb.group({
        content: []
      });
    }
    else {
      console.log("CommentFormComponent::createForm()", this.comment);
      this.files = this.comment.files ? this.comment.files : [];
      this.formGroup = this.fb.group({
          content: [ this.comment.content ]
      });
    }
  }

  onSubmit() {
    if ( this.mode == 'create' ) this.createComment();
    else this.editComment();
  }
  createComment() {
    console.log( this.formGroup.value );
    
    let req: _COMMENT_CREATE = {
      parent_idx: this.parent_idx,
      content: this.formGroup.get('content').value
    };

    req.file_hooks = this.files.map( (f:_FILE) => f.idx );

    this.postComment.create( req ).subscribe( res => {
      console.log('comment create: ', res);

      // console.log( this.share.posts );

      let post = this.share.posts.find( (post: _POST) => post.idx == res.data.root_idx );
      if ( post === void 0 ) return;
      if ( post.comments === void 0 ) post.comments = [];

      let i = post.comments.findIndex( (c: _COMMENT) => c.idx == res.data.parent_idx );
      if ( i == -1 ) post.comments.unshift( res.data );
      else {
        post.comments.splice( i + 1, 0, res.data );
      }

      this.createSuccess( res.data );
    }, err => this.postComment.alert(err) );
    
  }

  editComment() {
    let req: _COMMENT_EDIT = {
      idx: this.comment.idx,
      content: this.formGroup.get('content').value
    };
    req.file_hooks = this.files.map( (f:_FILE) => f.idx );
    this.postComment.edit( req ).subscribe( (res:_COMMENT_EDIT_RESPONSE) => {
      console.log('editComment():', res.data);
      this.editSuccess( res.data );
    });
  }

  reset() {
    this.files = [];
    this.formGroup.get('content').patchValue('');
  }

  createSuccess( comment: _COMMENT ) {
    this.reset();
    this.created.emit( comment );
  }
  editSuccess( comment: _COMMENT ) {
    this.reset();
    this.edited.emit( comment );
  }
  

  onClickCancel() {
    this.cancel.emit();
  }

}
