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
  BackendAdminForumPage
} from './angular-backend/angular-backend-admin';



import { AngularBackendComponentModule } from './angular-backend/modules/angular-backend-components.module';
import { CommunityAppModule } from './community-app/community-app.module';


import { LoginPage } from './community-app/pages/login/login';
import { RegisterPage } from './community-app/pages/register/register';
import { ForumPage } from './community-app/pages/forum/forum';

//import { AdminPage } from './pages/adminpage/adminpage';

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
  { path: 'admin/forum/:idx', component: BackendAdminForumPage },
  { path: 'admin/forum', component: BackendAdminForumPage },
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
