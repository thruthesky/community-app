import { Component, Input } from '@angular/core';
import {
    File,
    _FILE,
    _UPLOAD_RESPONSE
} from './../../../angular-backend/angular-backend';

@Component({
    selector: 'file-form-component',
    templateUrl:'./file-form-component.html',
    styleUrls: [ './file-form-component.scss' ]
})
export class FileFormComponent {

    @Input() files: Array<_FILE> = [];

    constructor( private file: File ) {

    }

    onChangeFile( _ ) {
        this.file.uploadPostFile( _.files[0] ).subscribe( res => {
            this.files.push( res.data );
        }, err => {
            console.log('err:', err);
            this.file.alert(err);
        });
    }


    onClickDeleteFile( file ) {
        console.log("FileFormComponent::onClickDeleteFile(file): ", file);
        this.file.delete( file.idx ).subscribe( (res:_UPLOAD_RESPONSE) => {
            console.log("file delete: ", res);
        }, err => this.file.alert(err) );
    }
}