import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialModel } from '../../../../shared/models/credential.model';
import { UserService, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-credential-search-index-page',
  styleUrls: ['./index-page.component.scss'],
  templateUrl: './index-page.component.html',
})
export class IndexPageComponent implements OnInit {
  searchText = '';
  searchResults: Array<CredentialModel> = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.initDummyData();
  }
  private initDummyData(): void {
    // this.searchResults.push(
    //   new CredentialModel(
    //     '1',
    //     '1',
    //     'Google Account 1',
    //     'https://www.google.com/login',
    //     'user1@gmail.com',
    //     'password'
    //   )
    // );
    // this.searchResults.push(
    //   new CredentialModel(
    //     '2',
    //     '1',
    //     'Rediff account 1',
    //     'https://www.rediff.com/login',
    //     'me@rediff.com',
    //     'password'
    //   )
    // );
    // this.searchResults.push(
    //   new CredentialModel(
    //     '1',
    //     '1',
    //     'Yahoo Account 1',
    //     'https://www.yahoo.com/login',
    //     'me@yahoo.com',
    //     'password'
    //   )
    // );
  }
  async searchCredentials(): Promise<void> {
    this.searchResults = await this.apiService.searchUserPassword(this.searchText);
  }
  async logoutUser(): Promise<void> {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
