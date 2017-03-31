import { Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import { POST_CREATE,
  POST_CREATE_RESPONSE,
  PostData,
  UPLOAD, FILE_UPLOAD_RESPONSE, File} from './../../../angular-backend/angular-backend';


@Component({
  selector: 'comment-form-component',
  templateUrl: './comment-form-component.html'
})

export class CommentFormComponent implements OnInit{
  photoIdx:number;
  active: boolean = false;
  commentForm: POST_CREATE = {};

  @Input() parentIdx;
  @Input() configId: string;
  constructor( private post: PostData, private file: File) {}

  ngOnInit() {
    this.commentForm.parent_idx = this.parentIdx;
  }

  onClickCreateComment() {
    this.commentForm.post_config_id = this.configId;
    this.commentForm.file_hooks = [this.photoIdx];
    this.post.create( this.commentForm ).subscribe( (res: POST_CREATE_RESPONSE ) =>{
      console.log( res );
      this.active = false;
    }, err => this.post.alert( err ));
  }
  onClickActivateCommentBox() {
    this.active = true;
  }
  onChangeFile( fileInput ) {
    console.log("file changed: ", fileInput);
    let file = fileInput.files[0];
    let req: UPLOAD = {
      model: 'post'
    };

    this.file.upload(req, file).subscribe(res => {
      console.log(res);
      this.photoIdx = res.data.idx;
    }, err => {
      console.log('error', err);
    });
  }
}
