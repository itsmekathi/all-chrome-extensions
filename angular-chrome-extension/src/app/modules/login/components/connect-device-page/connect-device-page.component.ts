import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, PageLoaderService } from 'src/app/shared/services';
import { NgForm } from '@angular/forms';

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
    private pageloaderService: PageLoaderService
  ) {}
  public showSuccessPage(): void {}

  public async validateDeviceToken(): Promise<void> {
    if (this.deviceCodeForm.valid) {
      this.pageloaderService.showPageLoader();
      try {
        const resp = await this.apiService.getBaseAPIUrl(this.deviceCode);
        console.log(resp);
        // save it to chrome storage
        this.pageloaderService.hidePageLoader();
        this.router.navigate(['success']);
      } catch (error) {
        this.pageloaderService.hidePageLoader();
        this.router.navigate(['paring-failure']);
      }
    }
  }
}
