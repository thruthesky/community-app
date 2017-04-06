import { Component, Input } from '@angular/core';
import { AppService } from './../../services/app-service';
@Component({
    selector: 'post-view-component',
    templateUrl: 'post-view-component.html'
})
export class PostViewComponent {
    @Input() post;
    showPostEditForm: boolean = false;
    showCommentForm: boolean = false;

    constructor( public appService: AppService ) {}


    // onEdited( post ) {
    //     console.log("onEdited: ", post);
    //     // this.post = post;
    // }
}