import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ORGANIZATION_BASE_URI } from '../constants';

@Injectable()
export class UserService {
  private isLoggedIn = false;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public async isOrganizationConfigured(): Promise<boolean> {
    return await this.storageService.exist(ORGANIZATION_BASE_URI);
  }
  public async setOrganizationUrl(value: string): Promise<void> {
    return await this.storageService.set(ORGANIZATION_BASE_URI, value);
  }

  public async getOrganizationUrl(): Promise<string> {
    return await this.storageService.get(ORGANIZATION_BASE_URI);
  }

  public async isLogged(): Promise<boolean> {
    const p = Promise.resolve(this.isLoggedIn);
    return await p;
  }

  public async login(username: string, password: string): Promise<boolean> {
    console.log(`Username: ${username}, Password: ${password}`);
    this.isLoggedIn = true;
    const p = Promise.resolve(true);
    return await p;
  }

  public async logout(): Promise<boolean> {
    await this.storageService.clear();
    return true;
  }
}
