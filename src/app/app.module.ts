import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AngularBackend } from './angular-backend/angular-backend';
import { PageNavigationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularBackend
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
