import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

const clientId = '37c24f0015b827a4de4f';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'oauth-flow-ext';
  code = '';
  loginName = '';
  statusText = '';
  redirectURI = chrome.identity.getRedirectURL() + 'auth';
  constructor(private router: Router, private zone: NgZone) {}

  public login(): void {
    this.statusText = 'Logging in..';
    try {
      chrome.identity.launchWebAuthFlow(
        {
          url: `https://github.com/login/oauth/authorize?client_id=${clientId}&login=${encodeURI(
            this.loginName
          )}&redirectURI=${encodeURI(this.redirectURI)}`,
          interactive: true,
        },
        (redirectURL) => {
          const urlParams = new URLSearchParams(redirectURL);
          const myParam = urlParams.get('code');
          console.log(redirectURL);
          this.code = myParam;
          this.zone.run(() => {
            this.code = myParam;
            this.statusText = `Success, Code ${myParam}, redirectUrl: ${redirectURL}`;
          });
          // this.router.navigate(['auth', '12121']);
        }
      );
    } catch (err) {
      console.error(err);
      this.statusText = 'Error';
    }
  }
}
