import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {I18nModule, UrlModule,} from '@spartacus/core';
import {AddToComparingComponent} from './add-to-comparing/add-to-comaring.component';
import {B2cStorefrontModule, GenericLinkModule, IconModule, ItemCounterModule, SpinnerModule} from '@spartacus/storefront';
import {HeaderComparingIconComponent} from './header-comparing-icon/header-comparing-icon.component';
import {SpartacusMiscCmsModule} from '../misc/misc.cms.module';
import {ComparingCategoriesComponent} from './comparing-categories/comparing-categories.component';
import {ProductComparingComponent} from './product-comparing/product-comparing.component';


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
        },
        CMSCategoryComparingPageComponent: {
          component: ComparingCategoriesComponent
        },
        CMSProductComparingPageComponent: {
          component: ProductComparingComponent
        }
      }
    }),
  ],
  declarations: [AddToComparingComponent, HeaderComparingIconComponent, ComparingCategoriesComponent, ProductComparingComponent],
  entryComponents: [HeaderComparingIconComponent, ComparingCategoriesComponent, ProductComparingComponent],
  exports: [AddToComparingComponent],
})
export class ProductComparingCmsModule {
}
