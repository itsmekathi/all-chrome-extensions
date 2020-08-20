import { Component } from '@angular/core';
import { StorageService } from '../../../shared/services';

@Component({
  selector: 'app-storage-demo',
  styleUrls: ['./storage-demo.component.scss'],
  templateUrl: './storage-demo.component.html',
})
export class StorageDemoComponent {
  key = '';
  value = '';
  keytoLookup = '';
  fetchedValue: any;
  constructor(private storageService: StorageService) {}
  async addToStorage(): Promise<void> {
    await this.storageService.set(this.key, this.value);
  }
  async getFromStorage(): Promise<void> {
    try {
      this.fetchedValue = await this.storageService.get(this.keytoLookup);
    } catch (error) {
      console.log(error);
    }
  }
}
