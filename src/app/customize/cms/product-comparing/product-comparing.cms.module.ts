import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {I18nModule, UrlModule,} from '@spartacus/core';
import {AddToComparingComponent} from './add-to-comparing/add-to-comaring.component';
import {B2cStorefrontModule, GenericLinkModule, IconModule, ItemCounterModule, SpinnerModule} from '@spartacus/storefront';
import {HeaderComparingIconComponent} from './header-comparing-icon/header-comparing-icon.component';
import {SpartacusMiscCmsModule} from '../misc/misc.cms.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SpinnerModule,
    UrlModule,
    IconModule,
    I18nModule,
    ItemCounterModule,
    SpartacusMiscCmsModule,
    GenericLinkModule,
    B2cStorefrontModule.withConfig({
      cmsComponents: {
        CMSProductComparingMenuIconComponent: {
          component: HeaderComparingIconComponent
        }
      }
    }),
  ],
  declarations: [AddToComparingComponent, HeaderComparingIconComponent],
  entryComponents: [HeaderComparingIconComponent],
  exports: [AddToComparingComponent],
})
export class ProductComparingCmsModule {
}
