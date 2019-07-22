import {ICON_TYPE, IconLoaderService, IconModule} from '@spartacus/storefront';
import {CommonModule} from '@angular/common';
import {I18nModule} from '@spartacus/core';
import {NgModule} from '@angular/core';
import {SpartacusIconLoaderService} from './spartacus-icon-loader.service';

export enum CUSTOM_ICON_TYPE {
  COMPARING = 'COMPARING'
}

// extend enum ICON_TYPE with new types
export const SPARTACUS_ICON_TYPE = {
  ...ICON_TYPE,
  ...CUSTOM_ICON_TYPE,
};

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    I18nModule,
  ],
  declarations: [],
  entryComponents: [],
  exports: [],
  providers: [ // Just an example how overwrite service from above IconModule
    {
      provide: IconLoaderService,
      useClass: SpartacusIconLoaderService
    }
  ]
})
export class SpartacusMiscCmsModule {
}
