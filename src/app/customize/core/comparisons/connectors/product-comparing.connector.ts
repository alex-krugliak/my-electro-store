import {Injectable} from '@angular/core';
import {ProductComparingAdapter} from './product-comparing.adapter';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductComparingConnector {
  constructor(protected adapter: ProductComparingAdapter) {
  }

  get(userUid: string): Observable<string[]> {
    return this.adapter.load(userUid);
  }

  addProduct(userUid: string, productCode: string): Observable<string[]> {
    return this.adapter.add(userUid, productCode);
  }

  removeProduct(userUid: string, productCode: string): Observable<string[]> {
    return this.adapter.remove(userUid, productCode);
  }
}
