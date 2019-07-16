import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {
  AddToCartModule,
  B2cStorefrontModule,
  IconModule,
  ListNavigationModule,
  MediaModule,
  ProductListModule,
  StarRatingModule,
  ɵf as ProductListComponentService
} from '@spartacus/storefront';
import {SpartacusProductListComponent} from './container/spartacus-product-list.component';
import {SpartacusProductListItemComponent} from './product-info/spartacus-product-list-item.component';
import {CurrencyService, I18nModule, LanguageService, ProductSearchService, RoutingService, UrlModule} from '@spartacus/core';
import {SpartacusProductListComponentService} from './container/spartacus-product-list-component.service';
import {SpartacusProductViewComponent} from './product-view/spartacus-product-view.component';
import {ProductComparingCmsModule} from '../product-comparing/product-comparing.cms.module';


@NgModule({
  imports: [
    ProductListModule,
    CommonModule,
    IconModule,
    I18nModule,
    ListNavigationModule,
    UrlModule,
    RouterModule,
    MediaModule,
    StarRatingModule,
    AddToCartModule,
    ProductComparingCmsModule,
    B2cStorefrontModule.withConfig({
      cmsComponents: {
        CMSProductListComponent: {
          component: SpartacusProductListComponent,
          providers: [
            {
              provide: ProductListComponentService,
              useClass: SpartacusProductListComponentService,
              deps: [ProductSearchService, RoutingService, ActivatedRoute, CurrencyService, LanguageService, Router]
            }
          ]
        }
      }
    }),
  ],
  declarations: [
    SpartacusProductListComponent,
    SpartacusProductListItemComponent,
    SpartacusProductViewComponent
  ],
  exports: [
    SpartacusProductListComponent,
    SpartacusProductListItemComponent
  ],
  entryComponents: [SpartacusProductListComponent, SpartacusProductListItemComponent]
})
export class SpartacusProductListModule {
}
