import {Injectable} from '@angular/core';
import {ProductComparingAdapter} from './product-comparing.adapter';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductComparingConnector {
  constructor(protected adapter: ProductComparingAdapter) {
  }

  get(): Observable<string[]> {
    debugger;
    return this.adapter.load();
  }
}
