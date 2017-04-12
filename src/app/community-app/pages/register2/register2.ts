import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'register2-page',
  templateUrl: './register2.html'
})
export class Register2Page {
    

  constructor (
    private router: Router
  ){}


  onCancel() {
      this.router.navigate(['/']);
  }
  onUpdate() {
      alert("User information updated.");
  }
  onRegister() {
      alert("Registration successful");
  }

}
