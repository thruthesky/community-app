import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';

import { AngularBackend } from './angular-backend/angular-backend';
import { PageNavigationComponent } from './pagination/pagination.component';
import { HeaderComponent } from './components/header/header';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { ProfilePage } from './pages/profile/profile';
import { ForumPage } from './pages/forum/forum';
import { AdminPage } from './pages/adminpage/adminpage';
const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'profile', component: ProfilePage },
  { path: 'forum', component: ForumPage },
  { path: 'admin', component: AdminPage }
];
@NgModule({
  declarations: [
    AppComponent,
    PageNavigationComponent,
    HeaderComponent,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ForumPage,
    AdminPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularBackend,
    RouterModule.forRoot( appRoutes )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
