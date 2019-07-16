import {Observable} from 'rxjs';

export abstract class ProductComparingAdapter {

  abstract load(): Observable<string[]>;
}
