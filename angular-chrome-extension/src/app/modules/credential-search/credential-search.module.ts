import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { CredentialResultPageComponent } from './components/credential-result-page/credential-result-page.component';
import { CredentialSearchRoutingModule } from './credential-search.routing.module';
import { SearchResultComponent } from './components/search-result/search-result.component';
import {MenuModule} from 'primeng/menu';
import {ClipboardModule} from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    IndexPageComponent,
    CredentialResultPageComponent,
    SearchResultComponent,
  ],
  imports: [CredentialSearchRoutingModule, SharedModule, MenuModule, ClipboardModule],
  providers: [],
  exports: [],
})
export class CredentialSearchModule {}
