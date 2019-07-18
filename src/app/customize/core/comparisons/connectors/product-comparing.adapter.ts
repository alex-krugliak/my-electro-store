import {Observable} from 'rxjs';

export abstract class ProductComparingAdapter {

  abstract load(userUid: string): Observable<string[]>;

  abstract add(userUid: string, productCode: string): Observable<string[]>;

  abstract remove(userUid: string, productCode: string): Observable<string[]>;
}
