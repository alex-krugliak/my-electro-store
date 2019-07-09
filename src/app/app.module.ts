import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConfigModule } from '@spartacus/core';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule, defaultCmsContentConfig, b2cLayoutConfig } from '@spartacus/storefront';
import {LayoutSlotConfig} from '@spartacus/storefront/layout/config/layout-config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    B2cStorefrontModule.withConfig({
      authentication: {
        client_id: 'client4kyma',
        client_secret: 'secret'
      },
      backend: {
        occ: {
          baseUrl: 'https://localhost:9002',
          prefix: '/rest/v2/',
          legacy: true
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
      layoutSlots: b2cLayoutConfig.layoutSlots
    }),
    ConfigModule.withConfigFactory(defaultCmsContentConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
