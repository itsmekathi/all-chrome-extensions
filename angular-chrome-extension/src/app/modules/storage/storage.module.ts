import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StorageDemoComponent } from './components/storage-demo.component';
import { StorageRoutingModule } from './storage-routing.module';

@NgModule({
  declarations: [
    StorageDemoComponent,
  ],
  imports: [StorageRoutingModule, SharedModule],
  providers: [],
  exports: [],
})
export class StorageModule {}
