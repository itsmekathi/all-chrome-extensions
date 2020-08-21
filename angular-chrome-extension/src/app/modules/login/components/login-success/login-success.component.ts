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
  constructor(private userService: UserService, private router: Router) {}
  async ngOnInit(): Promise<void> {
    this.vaultUrl = await this.userService.getOrganizationUrl();
    this.githubAuthCode = await this.userService.getGithubOAUTHCode();
  }

  async logoutUser(): Promise<void> {
    await this.userService.logout();
    this.router.navigate(['']);
  }
}
