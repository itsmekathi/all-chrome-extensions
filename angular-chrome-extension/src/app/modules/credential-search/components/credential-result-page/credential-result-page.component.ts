import { Component, Input } from '@angular/core';
import { CredentialModel } from 'src/app/shared/models/credential.model';

@Component({
  selector: 'app-credential-result-page',
  styleUrls: ['./credential-result-page.component.scss'],
  templateUrl: './credential-result-page.component.html',
})
export class CredentialResultPageComponent {
    @Input() searchResults: Array<CredentialModel>;
  constructor() {}
}
