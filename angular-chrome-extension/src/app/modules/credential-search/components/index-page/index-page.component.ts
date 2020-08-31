import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UserService } from 'src/app/shared/services';
import { CredentialModel } from '../../../../shared/models/credential.model';

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
  private async initDummyData(): Promise<void> {}
  async searchCredentials(): Promise<void> {
    this.searchResults = await this.apiService.searchUserPassword(
      this.searchText
    );
  }
  async logoutUser(): Promise<void> {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
