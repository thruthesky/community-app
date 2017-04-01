import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    PostData,
    File,
    NUMBERS,
    _FILE,
    _POST, _POST_CREATE, _POST_CREATE_RESPONSE
} from './../../../angular-backend/angular-backend';
import { ShareService } from './../../services/share-service';
@Component({
    selector: 'post-form-component',
    templateUrl: 'post-form-component.html'
})
export class PostFormComponent {
    @Input() post_config_id: string;
    formGroup: FormGroup;
    files: Array<_FILE> = [];
    active: boolean = false;

    @Output() created = new EventEmitter<_POST>();

    constructor(
        public share: ShareService,
        private fb: FormBuilder,
        public file: File,
        private postData: PostData
    ) {

        this.createForm();
    }

    createForm() {
        this.formGroup = this.fb.group({
            title: [],
            content: []
        });
    }


  onChangeFile( fileInput ) {
    this.file.uploadPostFile( fileInput.files[0] ).subscribe( res => {
      this.files.push( res.data );
    }, err => {
      this.file.alert(err);
    });
  }

  onSubmit() {
      
    console.log( this.formGroup.value );

    let create = <_POST_CREATE> this.formGroup.value;

    create.post_config_id = this.post_config_id;
    create.file_hooks = this.files.map( (f:_FILE) => f.idx );
    
    this.postData.create( create ).subscribe( ( res: _POST_CREATE_RESPONSE ) => {
        this.share.posts.unshift( res.data );
        console.log( res );
        this.success( res.data );
    }, err => this.postData.alert( err ) );
  }


  success( data: _POST ) {
    this.files = [];
    this.formGroup.get('title').patchValue('');
    this.formGroup.get('content').patchValue('');
    this.active = false;
    this.created.emit( data );
  }

}
