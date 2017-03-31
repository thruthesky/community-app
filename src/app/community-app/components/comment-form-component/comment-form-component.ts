import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//import 'rxjs/add/operator/debounceTime';
import { 
  PostComment,
  _POST,
  _COMMENT,
  _FILE,
  _COMMENT_CREATE,
  _COMMENT_CREATE_RESPONSE,
  UPLOAD, FILE_UPLOAD_RESPONSE, File} from './../../../angular-backend/angular-backend';
import { ShareService } from './../../services/share-service';
@Component({
  selector: 'comment-form-component',
  templateUrl: './comment-form-component.html'
})

export class CommentFormComponent implements OnInit{
  
  
  formGroup: FormGroup;
  @Input() parent_idx;
  @Input() active: boolean = false;
  files: Array<_FILE> = [];


  @Output() created = new EventEmitter<_COMMENT>();

  constructor(
    public share: ShareService,
    private fb: FormBuilder,
    private comment: PostComment,
    private file: File
  ) {
    this.createForm();
  }

  ngOnInit() {
    
  }

  createForm() {
    this.formGroup = this.fb.group({
      content: []
    });
  }

  onSubmit() {
    console.log( this.formGroup.value );
    
    let req: _COMMENT_CREATE = {
      parent_idx: this.parent_idx,
      content: this.formGroup.get('content').value
    };



    req.file_hooks = this.files.map( (f:_FILE) => f.idx );

    this.comment.create( req ).subscribe( res => {
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

      this.success( res.data );
    }, err => this.comment.alert(err) );
    


  }
  success( data: _COMMENT ) {
    this.files = [];
    this.formGroup.get('content').patchValue('');
    this.active = false;
    this.created.emit( data );
  }
  
    onChangeFile( _ ) {
    this.file.uploadPostFile( _.files[0] ).subscribe( res => {
      this.files.push( res.data );
    }, err => {
      console.log('err:', err);
      this.file.alert(err);
    });
  }

}
