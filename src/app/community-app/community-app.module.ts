import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularBackend } from './../angular-backend/angular-backend';
import { AngularBackendComponentModule } from './../angular-backend/modules/angular-backend-components.module';

import { HomePage } from './pages/home/home';
export { HomePage } from './pages/home/home';

import { HeaderComponent } from './components/header/header';
//import { CommentListComponent } from './components/comment-list-component/comment-list-component';
import { CommentFormComponent } from './components/comment-form-component/comment-form-component';
import { PostFormComponent } from './components/post-form-component/post-form-component';
import { PostListComponent } from './components/post-list-component/post-list-component';
import { PostViewComponent } from './components/post-view-component/post-view-component';
import { CommentViewComponent } from './components/comment-view-component/comment-view-component';


import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { ForumPage } from './pages/forum/forum';


import { ShareService } from './services/share-service';
@NgModule({
    declarations: [
        HomePage,
        HeaderComponent,
        LoginPage,
        RegisterPage,
        ForumPage,
        //CommentListComponent,
        CommentFormComponent,
        PostFormComponent,
        PostListComponent,
        PostViewComponent,
        CommentViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AngularBackend,
        AngularBackendComponentModule
    ],
    exports: [
        HomePage
    ],
    providers: [
        ShareService
    ]
})
export class CommunityAppModule {

}