import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AngularBackend } from './angular-backend/angular-backend';
import { PageNavigationComponent } from './pagination/pagination.component';
import { HeaderComponent } from './components/header/header';
import { CreateConfigComponent } from './components/modals/create_postconfig/create';

import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { ForumPage } from './pages/forum/forum';
import { AdminPage } from './pages/adminpage/adminpage';
const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
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
    ForumPage,
    AdminPage,
    CreateConfigComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularBackend,
    RouterModule.forRoot( appRoutes ),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ CreateConfigComponent ]
})
export class AppModule { }
