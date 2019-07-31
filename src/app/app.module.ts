import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ConfigModule} from '@spartacus/core';
import {translationChunksConfig, translations} from '@spartacus/assets';
import {B2cStorefrontModule, CmsPageGuard, defaultCmsContentConfig, PageLayoutComponent} from '@spartacus/storefront';
import {SpartacusProductListModule} from './customize/cms/product-list/spartacus-product-list.module';
import {ComparisonsCoreModule} from './customize/core/comparisons/comparisons.core.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SpartacusProductListModule,
    BrowserModule,
    AppRoutingModule,
    ComparisonsCoreModule,
    RouterModule.forChild([
      {
        path: 'comparing-categories',
        data: {pageLabel: 'category-comparing'},
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard]
      },
      {
        // path with dynamic param:
        path: 'comparing-products/:id',
        data: {pageLabel: 'product-comparing'},
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard]
      }
    ]),
    B2cStorefrontModule.withConfig({
      authentication: {
        client_id: 'client4kyma',
        client_secret: 'secret'
      },
      backend: {
        occ: {
          baseUrl: 'https://192.168.20.135:9012',
          prefix: '/rest/v2/',
          legacy: true,
          endpoints: {
            comparisons: 'users/${userId}/comparisons'
          }
        }
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en'
      },
      context: {
        urlEncodingParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['electronics-spa']
      },
      layoutSlots: {
        header: {
          md: {
            slots: [
              'PreHeader',
              'SiteContext',
              'SiteLinks',
              'SiteLogo',
              'SearchBox',
              'SiteLogin',
              'ComparingIcon',
              'MiniCart',
              'NavigationBar',
            ],
          },
          xs: {
            slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'ComparingIcon', 'MiniCart'],
          },
        }
      },
      icon: {
        symbols: {
          COMPARING: 'fas fa-balance-scale fa-2x',
          CART: 'fas fa-shopping-cart',
        }
      }

    }),
    ConfigModule.withConfigFactory(defaultCmsContentConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
