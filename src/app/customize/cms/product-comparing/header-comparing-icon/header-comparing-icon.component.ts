import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SPARTACUS_ICON_TYPE} from '../../misc/misc.cms.module';
import {Observable} from 'rxjs';
import {ProductComparingService} from '../../../core/comparisons/store/facade/product-comparing.service';
import {filter, map} from 'rxjs/operators';
import {isDefined} from '../../../utils/common.utils';
import * as _ from 'lodash';

export const SPARTACUS_COMPARING_CATEGORIES_URL = '/comparing-categories';
export const SPARTACUS_COMPARING_PRODUCT_URL_PREFIX = '/comparing-products/';

export interface ComparingCategoryNode {
  title: string;
  url: string;
  comparingProductsAmount: number;
}

@Component({
  selector: 'cx-header-comparing-icon',
  templateUrl: './header-comparing-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComparingIconComponent implements OnInit, OnDestroy {

  iconTypes = SPARTACUS_ICON_TYPE;
  comparingProductsAmount$: Observable<number>;
  categories$: Observable<ComparingCategoryNode[]>;
  comparingCategoriesUrl = SPARTACUS_COMPARING_CATEGORIES_URL;

  @ViewChild('menuDiv', {static: false})
  menuDiv: ElementRef;

  constructor(
    private cd: ChangeDetectorRef,
    private productComparingService: ProductComparingService,
    private elemRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnDestroy() {

  }

  // openMenu(event: UIEvent) {
  //   this.renderer.removeClass(this.menuDiv.nativeElement, 'display-none');
  // }

  ngOnInit() {

    this.comparingProductsAmount$ = this.productComparingService.getProductComparingData()
      .pipe(
        filter(categoryComparingDataList => isDefined(categoryComparingDataList)),
        map((categoryComparingDataList) => {
            return _.flatMap(categoryComparingDataList, product => product.categoryProducts).length;
          }
        ));


    this.categories$ = this.productComparingService.getProductComparingData()
      .pipe(
        filter(categoryComparingDataList => isDefined(categoryComparingDataList)),
        map((categoryComparingDataList) => {
          return _.map(categoryComparingDataList, categoryComparingData => {

            return {
              title: categoryComparingData.categoryName,
              url: SPARTACUS_COMPARING_PRODUCT_URL_PREFIX + categoryComparingData.categoryCode,
              comparingProductsAmount: categoryComparingData.categoryProducts.length
            };
          });
        }));

  }

}
