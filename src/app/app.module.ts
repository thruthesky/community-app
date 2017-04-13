import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AngularBackend } from './angular-backend/angular-backend';


import { AngularBackendAdmin } from './angular-backend/angular-backend-admin';

import { AngularBackendComponentModule } from './angular-backend/modules/angular-backend-components.module';
import { CommunityAppModule } from './community-app/community-app.module';

import { EnhanceSample } from './enhancer/components/sample';

///////

const appRoutes: Routes = [
  { path: '**', redirectTo: '/', pathMatch: 'full' }
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
  bootstrap: [ AppComponent ],
  entryComponents:[  ]
})
export class AppModule { }
