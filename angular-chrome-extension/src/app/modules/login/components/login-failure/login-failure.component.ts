import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-failure',
  styleUrls: ['./login-failure.component.scss'],
  templateUrl: './login-failure.component.html',
})
export class LoginFailureComponent {
  constructor(private router: Router) {}
  tryAgain(): void {
    this.router.navigate(['']);
  }
}
