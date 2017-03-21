import { Component } from '@angular/core';
import { Test } from './angular-backend/test/test';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app work!';
  constructor( test: Test ) {
  }
}
