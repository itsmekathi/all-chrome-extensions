import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VAULT_HQ_GET_BASE_URL_API, LOCAL_MOCK_API_URL } from '../constants';
import { CredentialModel } from '../models/credential.model';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private userService: UserService) {}

  public async getBaseAPIUrl(code: string): Promise<any> {
    return this.http
      .get(`${VAULT_HQ_GET_BASE_URL_API}${code}`, { responseType: 'text' })
      .toPromise();
  }

  public async searchUserPassword(
    searchString: string
  ): Promise<Array<CredentialModel>> {
    const token = await this.userService.getAuthToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token,
      }),
    };
    return this.http
      .get<Array<CredentialModel>>(
        `${LOCAL_MOCK_API_URL}/api/user-passwords?searchText=${encodeURI(
          searchString
        )}`,
        httpOptions
      )
      .toPromise();
  }
}
