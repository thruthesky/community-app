import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AngularBackend } from './angular-backend/angular-backend';

import { AngularBackendAdmin,
  BackendAdminPage,
  BackendAdminUserListPage,
  BackendAdminUserEditPage,
  BackendAdminForumConfigPage,
  BackendAdminForumCategoryPage,
  BackendAdminForumPostPage
} from './angular-backend/angular-backend-admin';


import { AngularBackendComponentModule } from './angular-backend/modules/angular-backend-components.module';
import { HeaderComponent } from './components/header/header';
import { ViewComponent } from './components/view-component/view-component';
import { CommentFormComponent } from './components/comment-form-component/comment-form-component';


import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { ForumPage } from './pages/forum/forum';

import { EnhanceSample } from './enhancer/components/sample';

///////

import { HomePage } from './community-app/community-app.module';

const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'profile', component: RegisterPage },
  { path: 'register', component: RegisterPage },
  { path: 'forum', component: ForumPage },
  { path: 'forum/:post_config_id', component: ForumPage },

  //{ path: 'admin', component: AdminPage },



  { path: 'admin/user', component: BackendAdminUserListPage },
  { path: 'admin/user/edit/:idx', component: BackendAdminUserEditPage },
  { path: 'admin/forum', component: BackendAdminForumConfigPage },
  { path: 'admin/forum/configs', component: BackendAdminForumConfigPage },
  { path: 'admin/forum/categories', component: BackendAdminForumCategoryPage },
  { path: 'admin/forum/posts', component: BackendAdminForumPostPage },

  { path: 'admin', component: BackendAdminPage },

  { path: '**', component: HomePage },

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePage,
    LoginPage,
    RegisterPage,
    ForumPage,
   // AdminPage,
   
    EnhanceSample,
    ViewComponent,
    CommentFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularBackend,
    AngularBackendAdmin,
    RouterModule.forRoot( appRoutes ),
    NgbModule.forRoot(),
    AngularBackendComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[  ]
})
export class AppModule { }
