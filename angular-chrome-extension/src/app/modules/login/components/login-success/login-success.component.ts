import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-success',
  styleUrls: ['./login-success.component.scss'],
  templateUrl: './login-success.component.html',
})
export class LoginSuccessComponent implements OnInit {
  vaultUrl = '';
  githubAuthCode = '';
  token = '';

  constructor(private userService: UserService, private router: Router) {}
  async ngOnInit(): Promise<void> {
    this.vaultUrl = await this.userService.getOrganizationUrl();
    this.githubAuthCode = await this.userService.getGithubOAUTHCode();
    this.userService.isAuthTokenPresent().then((val) => {
      if (val) {
        console.log('Navigating to credential-search page');
        this.router.navigate(['credential-search']);
      }
    });
  }

  async logoutUser(): Promise<void> {
    await this.userService.logout();
    this.router.navigate(['']);
  }
  async addToken(): Promise<void> {
    await this.userService.setAuthToken(this.token);
    this.router.navigate(['credential-search']);
  }
}
