import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {tap} from 'rxjs/operators';
import {ComparisonsState, ProductComparing} from '../comparisons.state';
import {getProductComparingList} from '../selectors/product-comparing.selectors';
import {Observable} from 'rxjs';
import {AddComparingProduct, LoadDefaultProductComparing, RemoveComparingProduct} from '../actions/product-comparing.action';


@Injectable({providedIn: 'root'})
export class ProductComparingService {
  constructor(
    protected productComparingStore: Store<ComparisonsState>) {
  }

  getProductComparingData(): Observable<ProductComparing[]> {
    return this.productComparingStore.pipe(select(getProductComparingList),
      tap(productComparing => {
        if (!productComparing) {
          this.productComparingStore.dispatch(new LoadDefaultProductComparing());
        }
      })
    );
  }

  updateProductComparingData(): void {
    this.productComparingStore.dispatch(new LoadDefaultProductComparing());
  }

  addComparingProduct(productCode: string): void {
    this.productComparingStore.dispatch(new AddComparingProduct(productCode));
  }

  removeComparingProduct(productCode: string): void {
    this.productComparingStore.dispatch(new RemoveComparingProduct(productCode));
  }

}
