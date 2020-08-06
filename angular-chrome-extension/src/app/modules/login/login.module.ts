import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ConnectDevicePageComponent } from './components/connect-device-page/connect-device-page.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { PairFailurePageComponent } from './components/pair-failure-page/pair-failure-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  declarations: [
    WelcomePageComponent,
    ConnectDevicePageComponent,
    LoginPageComponent,
    SuccessPageComponent,
    PairFailurePageComponent,
  ],
  imports: [LoginRoutingModule, SharedModule],
  providers: [],
  exports: [],
})
export class LoginModule {}
