import { Component } from '@angular/core';
import { Backend, User, Test } from './angular-backend/angular-backend.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(
    // test: Test,
    private backend: Backend,
    private user: User
  )
  {


    this.loadNewlyRegisteredUsers();

  }

  loadNewlyRegisteredUsers() {

    this.user.list( {} ).subscribe( res => {
      console.info(res);
    }, err => {
      console.error(err);
    });
  }
}
