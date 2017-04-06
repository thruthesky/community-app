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
import { AppService } from './../../services/app-service';
@Component({
  selector: 'comment-form-component',
  templateUrl: './comment-form-component.html'
})

export class CommentFormComponent implements OnInit {
  
  @Input() mode: 'create' | 'edit' = 'create';
  
  @Input() parent_idx;          /// only for creating comment.
  @Input() comment: _COMMENT = <_COMMENT> {};   /// only for editing comment.

  @Output() cancel = new EventEmitter<void>();
  @Output() created = new EventEmitter<_COMMENT>();
  @Output() edited = new EventEmitter<_COMMENT>();
  
  
  
  formGroup: FormGroup;
  files: Array<_FILE> = [];



  constructor(
    public as: AppService,
    private fb: FormBuilder,
    private postComment: PostComment,
    private file: File
  ) {
  }

  ngOnInit() {
    
    this.createForm();
  }

  createForm() {
    console.log("CommentFormComponent::createForm() : mode: ", this.mode);
    console.log("CommentFormComponent::createForm()", this.comment);
    if ( this.mode == 'create' ) {
      this.formGroup = this.fb.group({
        content: []
      });
    }
    else {
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
    console.log( "CommentFormComponent::createComment() Going to create a comment: ", this.formGroup.value );
    
    let req: _COMMENT_CREATE = {
      parent_idx: this.parent_idx,
      content: this.formGroup.get('content').value
    };

    req.file_hooks = this.files.map( (f:_FILE) => f.idx );

    this.postComment.create( req ).subscribe( res => {
      console.log('comment create: ', res);


      let post = this.as.posts.find( (post: _POST) => post.idx == res.data.root_idx );
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
    console.log( "CommentFormComponent::editComment() Going to edit a comment: ", this.formGroup.value );
    
    let req: _COMMENT_EDIT = {
      idx: this.comment.idx,
      content: this.formGroup.get('content').value
    };
    req.file_hooks = this.files.map( (f:_FILE) => f.idx );
            console.log('files: ', this.files);
            console.log('file_hooks', req.file_hooks);
    this.postComment.edit( req ).subscribe( (res:_COMMENT_EDIT_RESPONSE) => {
      console.log('editComment():', res.data);
      Object.assign( this.comment, res.data );
      this.editSuccess( res.data );
    }, err => this.postComment.alert( err ));
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
