import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginname: string;
  pass: string;
  returnUrl: string;
  isLoginInvalid = false;
  error: string;

  @ViewChild('loginForm', { static: false }) loginForm: NgForm;
  login(): void {}
}
