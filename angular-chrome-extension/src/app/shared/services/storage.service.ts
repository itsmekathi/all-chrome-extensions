import { Injectable } from '@angular/core';
import { IStorageService } from '../interfaces';

@Injectable()
export class StorageService implements IStorageService {
  constructor() {}
  get(key: string, noExpire?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(
        [key],
        (result: { [key: string]: any }): void => {
          resolve(result ? result[key] : null);
        }
      );
    });
  }
  set(key: string, value: any, expiration?: Date): Promise<any> {
    return new Promise((resolve, reject) => {
      const object = {};
      object[key] = value;
      chrome.storage.local.set(object, () => {});
    });
  }
  remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(key, () => {});
    });
  }
  exist(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(
        [key],
        (result: { [key: string]: any }): void => {
          resolve(result[key] ? true : false);
        }
      );
    });
  }
  clear(...excludedKeys: string[]): Promise<void> {
    // Clear all values for now
    return new Promise((resolve, reject) => {
      chrome.storage.local.clear(() => {
        resolve();
      });
    });
  }
}
