import { NgModule } from '@angular/core';
import * as directives from './directives';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';

const primeNgImports = [
  DropdownModule,
  InputTextModule,
  TooltipModule,
  CheckboxModule,
];

@NgModule({
  declarations: [
    // Directives
    directives.FullPageLoaderDirective,
    directives.ShowHideDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    primeNgImports,
  ],
  exports: [
    directives.FullPageLoaderDirective,
    directives.ShowHideDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
