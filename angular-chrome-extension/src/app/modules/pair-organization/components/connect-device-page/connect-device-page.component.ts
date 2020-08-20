import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ApiService,
  PageLoaderService,
  UserService
} from '../../../../shared/services';

@Component({
  selector: 'app-connect-device',
  templateUrl: './connect-device-page.component.html',
  styleUrls: ['./connect-device-page.component.scss'],
})
export class ConnectDevicePageComponent {
  @ViewChild('deviceCodeForm', { static: false }) deviceCodeForm: NgForm;
  deviceCode = '';
  constructor(
    private router: Router,
    private apiService: ApiService,
    private pageloaderService: PageLoaderService,
    private userService: UserService
  ) {}
  public showSuccessPage(): void {}

  public async validateDeviceToken(): Promise<void> {
    if (this.deviceCodeForm.valid) {
      this.pageloaderService.showPageLoader();
      try {
        const resp = await this.apiService.getBaseAPIUrl(this.deviceCode);
        this.userService.setOrganizationUrl(resp);
        this.pageloaderService.hidePageLoader();
        this.router.navigate(['success']);
      } catch (error) {
        this.pageloaderService.hidePageLoader();
        this.router.navigate(['paring-failure']);
      }
    }
  }
}
