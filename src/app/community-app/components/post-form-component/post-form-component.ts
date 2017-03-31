import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    PostData
} from './../../../angular-backend/angular-backend';

@Component({
    selector: 'post-form-component',
    templateUrl: 'post-form-component.html'
})
export class PostFormComponent {
    @Input() post_config_id: string;
    formGroup: FormGroup;
    constructor(
        private fb: FormBuilder,
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
}
