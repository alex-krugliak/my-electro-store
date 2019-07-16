import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {AddToComparingComponent} from './add-to-comparing/add-to-comaring.component';
import {IconModule, ItemCounterModule, SpinnerModule} from '@spartacus/storefront';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SpinnerModule,
    UrlModule,
    IconModule,
    I18nModule,
    ItemCounterModule
  ],
  declarations: [AddToComparingComponent],
  entryComponents: [AddToComparingComponent],
  exports: [AddToComparingComponent],
})
export class ProductComparingCmsModule {}
