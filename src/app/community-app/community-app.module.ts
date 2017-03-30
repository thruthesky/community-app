import { NgModule } from '@angular/core';
import { HomePage } from './pages/home/home';
export { HomePage } from './pages/home/home';
@NgModule({
    declarations: [
        HomePage
    ],
    exports: [
        HomePage
    ]
})
export class CommunityApp {

}