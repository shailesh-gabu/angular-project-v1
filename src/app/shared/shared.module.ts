import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

const Modules = [CommonModule, MatFormFieldModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, MatFormFieldModule, ...Modules],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
