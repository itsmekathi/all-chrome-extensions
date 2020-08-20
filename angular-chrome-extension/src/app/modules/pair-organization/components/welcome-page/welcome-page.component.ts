import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.userService.isOrganizationConfigured().then((val) => {
      if (val) {
        console.log('Re-routing to login page');
        this.router.navigate(['login']);
      }
    });
  }
  public showConnectDevicePage(): void {
    this.router.navigate(['connect-device']);
  }
}
