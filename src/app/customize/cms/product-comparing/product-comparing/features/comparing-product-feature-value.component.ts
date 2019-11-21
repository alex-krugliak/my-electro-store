import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {Product} from '@spartacus/core';


@Component({
  selector: 'cx-comparing-product-feature-value',
  templateUrl: './comparing-product-feature-value.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparingProductFeatureValueComponent implements OnInit {

  @Input() featureCode: string;
  @Input() product: Product;

  featureValue: string;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.featureCode && this.product) {
      this.featureValue = this.getProductFeatureForCode(this.featureCode, this.product);
    }

  }

  private getProductFeatureForCode(featureCode: string, product: Product) {
    const featureList = _.flatten(_.map(product.classifications, 'features'));
    const currentFeature = _.find(featureList, feature => feature.code === featureCode);

    if (!currentFeature) {
      return null;
    }

    let result = '';
    _.each(currentFeature.featureValues, featureValue => {
      result = result + featureValue.value;
    });
    return result;
  }

}
