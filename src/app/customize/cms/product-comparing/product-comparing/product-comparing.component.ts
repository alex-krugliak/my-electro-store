import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import {ProductComparingService} from '../../../core/comparisons/store/facade/product-comparing.service';
import {ProductComparing} from '../../../core/comparisons/store/comparisons.state';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {isDefined} from '../../../utils/common.utils';

@Component({
  selector: 'cx-product-comparing',
  templateUrl: './product-comparing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComparingComponent implements OnInit {

  comparingCategory$: Observable<ProductComparing>;

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private productComparingService: ProductComparingService
  ) {
  }

  ngOnInit(): void {
    debugger

    this.comparingCategory$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.productComparingService.getProductComparingData().pipe(
          filter(categoryComparison => isDefined(categoryComparison)),
          map((categoryComparison: ProductComparing[]) => {
            return _.find(categoryComparison, productComparing => productComparing.categoryCode === params.get('id'));
          })
        );
      }),
    );
  }


}
