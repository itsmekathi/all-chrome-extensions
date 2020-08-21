import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginPageOauthComponent } from './components/login-page-oauth/login-page-oauth.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { LoginFailureComponent } from './components/login-failure/login-failure.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginPageOauthComponent,
    LoginSuccessComponent,
    LoginFailureComponent,
  ],
  imports: [LoginRoutingModule, SharedModule],
  providers: [],
  exports: [],
})
export class LoginModule {}
