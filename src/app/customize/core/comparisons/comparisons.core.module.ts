import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducerProvider, reducerToken} from './store/reducers';
import {ProductComparingAdapter} from './connectors/product-comparing.adapter';
import {ProductComparingAdapterImpl} from './connectors/impl/product-comparing.adapter.impl';
import {EffectsModule} from '@ngrx/effects';
import {ProductComparingEffects} from './store/effects/product-comparing.effect';
import {UserModule} from '@spartacus/core';
import {COMPARING_FEATURE} from './store/comparisons.state';


@NgModule({
  imports: [
    CommonModule,
    UserModule,
    StoreModule.forFeature(COMPARING_FEATURE, reducerToken, {metaReducers}),
    EffectsModule.forFeature([ProductComparingEffects]),
    RouterModule
  ],
  providers: [
    reducerProvider,
    {
      provide: ProductComparingAdapter,
      useClass: ProductComparingAdapterImpl,
    }
  ]
})
export class ComparisonsCoreModule {
}
