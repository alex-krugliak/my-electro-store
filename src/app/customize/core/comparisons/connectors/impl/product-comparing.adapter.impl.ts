import {Injectable} from '@angular/core';
import {ProductComparingAdapter} from '../product-comparing.adapter';
import {HttpClient} from '@angular/common/http';
import {ConverterService, OccEndpointsService} from '@spartacus/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class ProductComparingAdapterImpl implements ProductComparingAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {
  }

  load(): Observable<string[]> {
    debugger;
    return of(['a', '779842']);
  }

  protected getEndpoint(code: string): string {
    return this.occEndpoints.getUrl('product', {
      productCode: code,
    });
  }
}
