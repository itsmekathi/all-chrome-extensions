import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VAULT_HQ_GET_BASE_URL_API } from '../constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  public async getBaseAPIUrl(code: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'text/plain, charset=utf-8',
        'Content-Type': 'text/plain, charset=utf-8',
      }),
      responseType: 'text' as string,
    };

    return this.http
      .get(`${VAULT_HQ_GET_BASE_URL_API}${code}`, { responseType: 'text' })
      .toPromise();
  }
}
