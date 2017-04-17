import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'password-page',
  templateUrl: './password.html'
})
export class PasswordPage {
  error
  constructor(
    public router: Router
  ){}
}
