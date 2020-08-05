import { OnDestroy, ElementRef, Renderer2, Directive } from '@angular/core';
import { PageLoaderService } from '../services/page-loader.service';
import { Subscription } from 'rxjs';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fullPageLoader]'
})
export class FullPageLoaderDirective implements OnDestroy {
  private sub: Subscription;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private pageLoaderService: PageLoaderService
  ) {
    this.sub = this.pageLoaderService.isPageLoading.subscribe(
      (isLoading: boolean) => {
        if (isLoading) {
          this.renderer.addClass(this.el.nativeElement, 'full-page-loader');
        } else {
          this.renderer.removeClass(this.el.nativeElement, 'full-page-loader');
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
