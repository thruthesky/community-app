import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { PasswordPage } from './pages/password/password';
import { RegisterPage } from './pages/register/register';
import { Register2Page } from './pages/register2/register2';
import { ForumPage } from './pages/forum/forum';
import { Forum2Page } from './pages/forum2/forum2';
import { Forum3Page } from './pages/forum3/forum3';
import { PostViewPage } from './pages/post-view/post-view';

import { HomePage } from './pages/home/home';
import { RedirectComponent } from './components/redirect/redirect';
const CommunityAppRoutes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'password', component: PasswordPage },
  { path: 'profile', component: RegisterPage },
  { path: 'profile2', component: Register2Page },
  { path: 'register', component: RegisterPage },
  { path: 'register2', component: Register2Page },
  { path: 'forum', component: ForumPage },
  { path: 'forum/:post_config_id', component: ForumPage },
  { path: 'forum2/:post_config_id', component: Forum2Page },
  { path: 'forum3/:post_config_id', component: Forum3Page },
  { path: 'p/:post_idx', component: PostViewPage },
  { path: 'p/:post_idx/:title', component: PostViewPage },
  { path: 'redirect', component: RedirectComponent },
  { path: '', component: HomePage }
];
@NgModule({
    imports: [
        RouterModule.forChild( CommunityAppRoutes )
    ],
    exports: [ RouterModule ]
})
export class CommunityAppRoutingModule {}
