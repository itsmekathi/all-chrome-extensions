import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GITHUB_OAUTH_CODE,
  ORGANIZATION_BASE_URI,
  AUTH_TOKEN,
} from '../constants';
import { StorageService } from './storage.service';

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

  public async setGithubOAUTHCode(value: string): Promise<string> {
    return await this.storageService.set(GITHUB_OAUTH_CODE, value);
  }
  public async getGithubOAUTHCode(): Promise<string> {
    return await this.storageService.get(GITHUB_OAUTH_CODE);
  }
  public async isGithubOAUTHDone(): Promise<boolean> {
    return await this.storageService.exist(GITHUB_OAUTH_CODE);
  }

  public async setAuthToken(value: string): Promise<string> {
    return await this.storageService.set(AUTH_TOKEN, value);
  }
  public async getAuthToken(): Promise<string> {
    return await this.storageService.get(AUTH_TOKEN);
  }
  public async isAuthTokenPresent(): Promise<string> {
    return await this.storageService.get(AUTH_TOKEN);
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
