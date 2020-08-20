import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageDemoComponent } from './components/storage-demo.component';

const routes: Routes = [{ path: '', component: StorageDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorageRoutingModule {}
