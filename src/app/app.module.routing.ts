import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const AppModuleRoutes: Routes = [
  { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [
        RouterModule.forRoot( AppModuleRoutes )
    ],
    exports : [ RouterModule ]
})
export class AppModuleRouting {}