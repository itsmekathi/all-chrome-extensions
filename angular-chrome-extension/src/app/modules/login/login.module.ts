import { NgModule } from '@angular/core';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [LoginRoutingModule, SharedModule],
  providers: [],
  exports: [],
})
export class LoginModule {}
