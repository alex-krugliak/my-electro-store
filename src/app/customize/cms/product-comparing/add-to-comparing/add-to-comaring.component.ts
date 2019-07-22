import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit,} from '@angular/core';
import {ProductComparingService} from '../../../core/comparisons/store/facade/product-comparing.service';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import * as _ from 'lodash';


@Component({
  selector: 'cx-add-to-comparing',
  templateUrl: './add-to-comparing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToComparingComponent implements OnInit {
  @Input() productCode: string;
  @Input() isAdded = true;

  isPresentInComparing$: Observable<Boolean>;

  constructor(
    private cd: ChangeDetectorRef,
    private productComparingService: ProductComparingService
  ) {
  }

  ngOnInit() {
    this.isPresentInComparing$ = this.productComparingService.getProductComparingData()
      .pipe(
        filter(productComparingList => !!productComparingList),
        map((productComparingList) => {

          const products = _.flatten(_.map(productComparingList, 'categoryProducts'));
          return !!_.find(products, (product) => product.code === this.productCode);
          }
        ));
  }

  addToComparing() {
    this.productComparingService.addComparingProduct(this.productCode);
  }

}
