import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ConnectDevicePageComponent } from './components/connect-device-page/connect-device-page.component';
import { PairFailurePageComponent } from './components/pair-failure-page/pair-failure-page.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { PairOrganizationRoutingModule } from './pair-organization.routing.module';


@NgModule({
  declarations: [
    WelcomePageComponent,
    ConnectDevicePageComponent,
    SuccessPageComponent,
    PairFailurePageComponent,
  ],
  imports: [PairOrganizationRoutingModule, SharedModule],
  providers: [],
  exports: [],
})
export class PairOrganizationModule {}
