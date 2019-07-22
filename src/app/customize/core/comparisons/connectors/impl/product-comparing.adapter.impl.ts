import {Injectable} from '@angular/core';
import {ProductComparingAdapter} from '../product-comparing.adapter';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConverterService, OccEndpointsService} from '@spartacus/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';


const COMPARISONS_ENDPOINT = 'comparisons';

@Injectable()
export class ProductComparingAdapterImpl implements ProductComparingAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {
  }

  load(userUid: string): Observable<string[]> {
    const url = this.getEndpoint(userUid);
    return this.http
      .get<any>(url)
      .pipe(map(result => {
        return _.map(result, value => value.productCode);
      }));
  }

  add(userUid: string, productCode: string): Observable<string[]> {
    const url = this.getEndpoint(userUid) + '/add?productCode=' + productCode;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(url, null, {
      headers,
    }).pipe(map(result => {
      return result;
    }));
  }

  remove(userUid: string, productCode: string): Observable<string[]> {
    const url = this.getEndpoint(userUid) + '/remove?productCode=' + productCode;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete<any>(url, {
      headers,
    });
  }


  protected getEndpoint = (userUid: string): string => {
    const baseUrl = this.occEndpoints.getUrl(
      COMPARISONS_ENDPOINT,
      {userId: userUid});
    return baseUrl;
  }
}
