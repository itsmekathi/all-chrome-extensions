import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()
export class PageLoaderService {
  private pageLoading = new BehaviorSubject(false);

  public get isPageLoading(): Observable<boolean> {
    return this.pageLoading.asObservable();
  }

  public showPageLoader(): void {
    this.pageLoading.next(true);
  }

  public hidePageLoader(): void {
    this.pageLoading.next(false);
  }
}
