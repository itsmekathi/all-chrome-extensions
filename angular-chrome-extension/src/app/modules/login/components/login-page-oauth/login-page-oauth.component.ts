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
  userName = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private zone: NgZone
  ) {}
  async ngOnInit(): Promise<void> {
    // Initiate checking storage and route to other pages.
  }

  public login(): void {
    const redirectURI = chrome.identity.getRedirectURL() + 'auth';
    try {
      chrome.identity.launchWebAuthFlow(
        {
          url: `https://github.com/login/oauth/authorize?client_id=${GITHUB_OAUTH_CLIENTID}&login=${encodeURI(
            this.userName
          )}redirectURI=${encodeURI(redirectURI)}`,
          interactive: true,
        },
        (res) => {
          const urlParams = new URLSearchParams(res);
          const myParam = urlParams.get('code');
          console.log(res);
          this.zone.run(() => {
            this.router.navigate(['success']);
          });
        }
      );
    } catch (err) {
      this.zone.run(() => {
        this.router.navigate(['failure']);
      });
    }
  }
}
