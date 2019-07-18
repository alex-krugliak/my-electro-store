import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ConfigModule} from '@spartacus/core';
import {translationChunksConfig, translations} from '@spartacus/assets';
import {b2cLayoutConfig, B2cStorefrontModule, defaultCmsContentConfig, ProductListComponent} from '@spartacus/storefront';
import {SpartacusProductListModule} from './customize/cms/product-list/spartacus-product-list.module';
import {ComparisonsCoreModule} from './customize/core/comparisons/comparisons.core.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SpartacusProductListModule,
    BrowserModule,
    AppRoutingModule,
    ComparisonsCoreModule,
    B2cStorefrontModule.withConfig({
      authentication: {
        client_id: 'client4kyma',
        client_secret: 'secret'
      },
      backend: {
        occ: {
          baseUrl: 'https://localhost:9002',
          prefix: '/rest/v2/',
          legacy: true,
          endpoints:{
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
        parameters: {
          baseSite: {
            values: [
              'electronics-spa'
            ],
            persistence: 'route',
          },
        },
      },
      layoutSlots: b2cLayoutConfig.layoutSlots,

    }),
    ConfigModule.withConfigFactory(defaultCmsContentConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
