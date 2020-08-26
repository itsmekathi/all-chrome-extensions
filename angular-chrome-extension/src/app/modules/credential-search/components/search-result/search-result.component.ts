import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CredentialModel } from 'src/app/shared/models/credential.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @Input() myCredential: CredentialModel;
  public items: MenuItem[];
  constructor(private clipboard: Clipboard) {
    this.items = [
      {
        label: '',
        items: [
          {
            label: 'Copy username',
            icon: 'pi pi-plus',
            command: () => this.copyUserNameToClipboard(),
          },
          {
            label: 'Copy password',
            icon: 'pi pi-download',
            command: () => this.copyPasswordToClipboard(),
          },
        ],
      },
    ];
  }
  copyUserNameToClipboard(): void {
    this.clipboard.copy(this.myCredential.userName);
  }
  copyPasswordToClipboard(): void {
    this.clipboard.copy(this.myCredential.password);
  }
  openNewTab(): void {
    chrome.tabs.create(
      { url: this.myCredential.siteUrl, active: true },
      (newTab) => {
        chrome.tabs.sendMessage(newTab.id, this.myCredential);
      }
    );
  }
}
