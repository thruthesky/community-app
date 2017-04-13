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
  BackendAdminForumPostPage,
  BackendAdminFileListPage
} from './angular-backend/angular-backend-admin';



import { AngularBackendComponentModule } from './angular-backend/modules/angular-backend-components.module';
import { CommunityAppModule } from './community-app/community-app.module';


import { LoginPage } from './community-app/pages/login/login';
import { RegisterPage } from './community-app/pages/register/register';
import { Register2Page } from './community-app/pages/register2/register2';
import { ForumPage } from './community-app/pages/forum/forum';
import { Forum2Page } from './community-app/pages/forum2/forum2';

import { EnhanceSample } from './enhancer/components/sample';

///////

import { HomePage } from './community-app/community-app.module';

import { RedirectComponent } from './community-app/components/redirect/redirect';

const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'profile', component: RegisterPage },
  { path: 'profile2', component: Register2Page },
  { path: 'register', component: RegisterPage },
  { path: 'register2', component: Register2Page },
  { path: 'forum', component: ForumPage },
  { path: 'forum/:post_config_id', component: ForumPage },

  { path: 'forum2/:post_config_id', component: Forum2Page },



  //{ path: 'admin', component: AdminPage },


  { path: 'redirect', component: RedirectComponent },



  { path: 'admin/user', component: BackendAdminUserListPage },
  { path: 'admin/user/edit/:idx', component: BackendAdminUserEditPage },
  { path: 'admin/forum', component: BackendAdminForumConfigPage },
  { path: 'admin/forum/configs', component: BackendAdminForumConfigPage },
  { path: 'admin/forum/categories', component: BackendAdminForumCategoryPage },
  { path: 'admin/forum/posts', component: BackendAdminForumPostPage },
  { path: 'admin/forum/posts/:post_config_id', component: BackendAdminForumPostPage },
  { path: 'admin/file', component: BackendAdminFileListPage },

  { path: 'admin', component: BackendAdminPage },

  { path: '**', component: HomePage },

];
@NgModule({
  declarations: [
    AppComponent,
   // AdminPage,

    EnhanceSample
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularBackend,
    AngularBackendAdmin,
    RouterModule.forRoot( appRoutes ),
    NgbModule.forRoot(),
    AngularBackendComponentModule,
    CommunityAppModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[  ]
})
export class AppModule { }
