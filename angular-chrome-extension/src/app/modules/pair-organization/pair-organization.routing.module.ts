import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectDevicePageComponent } from './components/connect-device-page/connect-device-page.component';
import { PairFailurePageComponent } from './components/pair-failure-page/pair-failure-page.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome-page', pathMatch: 'full' },
  { path: 'welcome-page', component: WelcomePageComponent },
  { path: 'connect-device', component: ConnectDevicePageComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: 'paring-failure', component: PairFailurePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PairOrganizationRoutingModule {}
