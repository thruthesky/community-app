import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AngularBackendModule } from './angular-backend/angular-backend.module';
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
    AngularBackendModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
