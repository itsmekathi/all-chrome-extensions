import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '.';

@Injectable()
export class UserService {
  private isLoggedIn = false;
  constructor(private http: HttpClient, private storageService: StorageService) {}

  public async isOrganizationConfigured(): Promise<boolean> {
    const p = Promise.resolve(false);
    return await p;
  }

  public async getOrganizationUrl(): Promise<string> {
    const p = Promise.resolve('url');
    return await p;
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
    this.isLoggedIn = false;
    const p = Promise.resolve(true);
    return await p;
  }
}
