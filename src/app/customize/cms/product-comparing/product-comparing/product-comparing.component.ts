import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import {ProductComparingService} from '../../../core/comparisons/store/facade/product-comparing.service';
import {ProductComparing} from '../../../core/comparisons/store/comparisons.state';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {isDefined} from '../../../utils/common.utils';
import {Product} from '@spartacus/core';

@Component({
  selector: 'cx-product-comparing',
  templateUrl: './product-comparing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComparingComponent implements OnInit {

  comparingCategory$: Observable<ProductComparing>;
  isOnlyUniqueFeatures = false;

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private productComparingService: ProductComparingService
  ) {
  }

  ngOnInit(): void {

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

  getFeatures(comparingCategory) {
    const classifications = _.flatten(_.map(comparingCategory.categoryProducts, 'classifications'));
    const featureList = _.flatten(_.map(classifications, 'features'));

    if (!featureList) {
      return [];
    }

    const featureCodeList = [];
    _.each(featureList, feature => {
      featureCodeList.push(feature.code);
    });

    const distinctFeatureList = [];
    _.each(_.uniq(featureCodeList), featureCode => {
      const feature = _.find(featureList, feature => feature.code === featureCode);
      if (!this.isOnlyUniqueFeatures ||
        (this.isOnlyUniqueFeatures && this.isFeatureValuesDistinctForProducts(feature.code, comparingCategory.categoryProducts))) {
        distinctFeatureList.push({
          code: feature.code,
          title: feature.name
        });
      }
      featureCodeList.push(feature.code);
    });

    return distinctFeatureList;
  }

  private isFeatureValuesDistinctForProducts(featureCode: string, productList: Product[]) {
    if (!productList) return true;

    let featureValues = [];
    _.each(productList, product => {
      const productFeatures = _.flatten(_.map(product.classifications, 'features'));
      const currentFeature = _.find(productFeatures, feature => feature.code === featureCode);
      if (!currentFeature || !currentFeature.featureValues) {
        featureValues.push('');
      } else {
        _.each(currentFeature.featureValues, featureValue => {
          featureValues.push(!featureValue.value ? '' : featureValue.value);
        });
      }
    });

    return _.uniq(featureValues).length > 1;
  }

  removeProductFromComparing(product: Product) {
    this.productComparingService.removeComparingProduct(product.code);
  }

  switchToUniqueFeatures() {
    this.isOnlyUniqueFeatures = true;
  }

  switchToAllFeatures() {
    this.isOnlyUniqueFeatures = false;
  }

}
