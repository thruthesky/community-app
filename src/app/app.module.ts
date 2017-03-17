import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { ProgressService } from '../service/progress';
import { CustomBrowserXhr } from '../service/custom-browser-xhr';

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
  providers: [
    ProgressService,
    { provide: BrowserXhr, useClass: CustomBrowserXhr }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
