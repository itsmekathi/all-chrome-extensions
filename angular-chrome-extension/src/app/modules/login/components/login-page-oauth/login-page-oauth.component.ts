import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GITHUB_OAUTH_CLIENTID } from '../../../../shared/constants';
import { UserService } from '../../../../shared/services';

@Component({
  selector: 'app-login-page-oauth',
  styleUrls: ['./login-page-oauth.component.scss'],
  templateUrl: './login-page-oauth.component.html',
})
export class LoginPageOauthComponent implements OnInit {
  loginname = '';
  redirectURI = chrome.identity.getRedirectURL() + 'auth';
  isLoginInvalid = false;
  error: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private zone: NgZone
  ) {}
  ngOnInit(): void {
    this.userService.isGithubOAUTHDone().then((val) => {
      if (val) {
        console.log('Actual login - success page');
        this.router.navigate(['login', 'success']);
      }
    });
  }

  public login(): void {
    try {
      chrome.identity.launchWebAuthFlow(
        {
          url: `https://github.com/login/oauth/authorize?client_id=${GITHUB_OAUTH_CLIENTID}&login=${encodeURI(
            this.loginname
          )}&redirectURI=${encodeURI(this.redirectURI)}`,
          interactive: true,
        },
        (res) => {
          console.log(res);
          const authCode = new URL(res).searchParams.get('code');
          this.zone.run(() => {
            this.userService.setGithubOAUTHCode(authCode);
            this.router.navigate(['login', 'success']);
          });
        }
      );
    } catch (err) {
      this.zone.run(() => {
        this.isLoginInvalid = true;
        // this.router.navigate(['login', 'failure']);
      });
    }
  }
}
