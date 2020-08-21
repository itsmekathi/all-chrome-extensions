import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageOauthComponent } from './components/login-page-oauth/login-page-oauth.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { LoginFailureComponent } from './components/login-failure/login-failure.component';

const routes: Routes = [
  { path: '', component: LoginPageOauthComponent },
  { path: 'success', component: LoginSuccessComponent },
  { path: 'failure', component: LoginFailureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
