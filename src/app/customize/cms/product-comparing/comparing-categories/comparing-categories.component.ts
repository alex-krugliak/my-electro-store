import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from '@spartacus/core';
import * as _ from 'lodash';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ProductComparingService} from '../../../core/comparisons/store/facade/product-comparing.service';
import {SPARTACUS_COMPARING_PRODUCT_URL_PREFIX} from '../header-comparing-icon/header-comparing-icon.component';
import {isDefined} from '../../../utils/common.utils';

export interface ComparingCategories {
  categoryTitle: string;
  categoryCode: string;
  url: string;
  comparingProducts: Product[];
}

@Component({
  selector: 'cx-comparing-categories',
  templateUrl: './comparing-categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparingCategoriesComponent implements OnInit {

  categories$: Observable<ComparingCategories[]>;

  constructor(
    private cd: ChangeDetectorRef,
    private productComparingService: ProductComparingService
  ) {
  }

  ngOnInit(): void {
    this.categories$ = this.productComparingService.getProductComparingData()
      .pipe(
        filter(categoryComparingDataList => isDefined(categoryComparingDataList)),
        map((categoryComparingDataList) => {
          return _.map(categoryComparingDataList, categoryComparingData => {
            return {
              categoryTitle: categoryComparingData.categoryName,
              url: SPARTACUS_COMPARING_PRODUCT_URL_PREFIX + categoryComparingData.categoryCode,
              categoryCode: categoryComparingData.categoryCode,
              comparingProducts: categoryComparingData.categoryProducts
            };
          });
        }));

  }

  removeProductFromComparing(product): void {
    this.productComparingService.removeComparingProduct(product.code);
  }


}
