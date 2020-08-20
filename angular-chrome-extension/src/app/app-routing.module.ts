import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main-component/main.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/pair-organization/pair-organization.module').then(
        (m) => m.PairOrganizationModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/storage/storage.module').then((m) => m.StorageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
