import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AngularBackend } from './angular-backend/angular-backend';


import { AngularBackendAdmin } from './angular-backend/angular-backend-admin';

import { AngularBackendComponentModule } from './angular-backend/modules/angular-backend-components.module';
import { CommunityAppModule } from './community-app/community-app.module';

import { EnhanceSample } from './enhancer/components/sample';
import { AppModuleRouting } from './app.module.routing';

// const AppModuleRoutes: Routes = [
//   { path: '**', redirectTo: '/' }
// ];

@NgModule({
  declarations: [
    AppComponent,
    EnhanceSample
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //RouterModule.forRoot( AppModuleRoutes ),
    AngularBackend,
    AngularBackendAdmin,
    NgbModule.forRoot(),
    AngularBackendComponentModule,
    CommunityAppModule,
    AppModuleRouting

  ],
  providers: [],
  bootstrap: [ AppComponent ],
  entryComponents:[  ]
})
export class AppModule {
  // constructor( router: Router ) {
  //   console.info('Routes: ', JSON.stringify(router.config, undefined, 2));
  // }
}

