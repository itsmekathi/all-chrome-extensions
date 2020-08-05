import { Directive, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[showHide]',
})
export class ShowHideDirective {
  private shown = false;
  constructor(private el: ElementRef) {
    this.setup();
  }
  setup(): void {
    const eyeButton = this.el.nativeElement;
    const inputField = eyeButton.parentNode.previousElementSibling;
    eyeButton.addEventListener('click', ($event) => {
      this.toggle(eyeButton, inputField);
    });
  }
  toggle(eyeButton: HTMLElement, inputField: HTMLElement): void {
    this.shown = !this.shown;
    if (this.shown) {
      inputField.setAttribute('type', 'text');
      eyeButton.classList.add('fa-eye-slash');
      eyeButton.classList.remove('fa-eye');
    } else {
      inputField.setAttribute('type', 'password');
      eyeButton.classList.add('fa-eye');
      eyeButton.classList.remove('fa-eye-slash');
    }
  }
}
