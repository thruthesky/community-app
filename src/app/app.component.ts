import { Component } from '@angular/core';
import { Test } from './angular-backend/test';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(
    test: Test
  )
  {



  }
}
