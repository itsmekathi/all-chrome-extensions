import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pair-failure',
  templateUrl: './pair-failure-page.component.html',
  styleUrls: ['./pair-failure-page.component.scss'],
})
export class PairFailurePageComponent {
  constructor(private router: Router) {}
  public showConnectDevicePage(): void {
    this.router.navigate(['connect-device']);
  }
}
