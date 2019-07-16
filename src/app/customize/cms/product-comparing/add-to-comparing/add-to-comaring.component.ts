import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit,} from '@angular/core';
import {ProductComparingService} from '../../../core/comparisons/store/facade/product-comparing.service';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';


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
    debugger;
    this.isPresentInComparing$ = this.productComparingService.getProductComparingData()
      .pipe(
        filter(productComparingList => !!productComparingList),
        map((productComparingList) => {
            return productComparingList.includes(this.productCode);
          }
        ));
  }

  addToComparing() {
    this.productComparingService.addComparingProduct(this.productCode);
  }

}
