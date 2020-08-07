import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessComponent } from './components/success-component/success.component';
import {AppComponent} from './app.component';
const routes: Routes = [
  {path: '', component: AppComponent },
  {path: 'auth/:id', component: SuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
