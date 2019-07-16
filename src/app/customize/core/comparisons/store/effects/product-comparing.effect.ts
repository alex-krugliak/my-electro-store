import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {ProductComparingConnector} from '../../connectors/product-comparing.connector';
import {
  ADD_COMPARING_PRODUCT,
  AddComparingProduct,
  AddComparingProductFail,
  AddComparingProductSuccess,
  LOAD_DEFAULT_PRODUCT_COMPARING,
  LoadProductComparingFail,
  LoadProductComparingSuccess
} from '../actions/product-comparing.action';
import {UserService} from '@spartacus/core';

export const PRODUCT_COMPARING_KEY = 'spartacus-product-comparing';

@Injectable()
export class ProductComparingEffects {
  @Effect()
  loadProductComparing$: Observable<LoadProductComparingSuccess | LoadProductComparingFail> =
    this.actions$.pipe(
      ofType(LOAD_DEFAULT_PRODUCT_COMPARING),
      mergeMap(() => {
        return this.userService.get().pipe(
          map(user => {
            if (Object.keys(user).length === 0) {

              const productList = localStorage.getItem(PRODUCT_COMPARING_KEY) ?
                JSON.parse(localStorage.getItem(PRODUCT_COMPARING_KEY)) : [];

              return new LoadProductComparingSuccess({
                productCodeList: productList
              });
            } else {
              this.productComparingConnector.get().pipe(
                map(data => {
                  return new LoadProductComparingSuccess({
                    productCodeList: data
                  });
                }),
                catchError(error => of(new LoadProductComparingFail(error)))
              );
            }
          }),
          catchError(error => of(new LoadProductComparingFail(error)))
        );
      })
    );

  @Effect()
  addComparingProduct$: Observable<AddComparingProductSuccess | AddComparingProductFail> =
    this.actions$.pipe(
      ofType(ADD_COMPARING_PRODUCT),
      map((action: AddComparingProduct) => action.payload),
      mergeMap(productCode => {
        return this.userService.get().pipe(
          map(user => {
            let productList;
            if (Object.keys(user).length === 0) {

              productList = localStorage.getItem(PRODUCT_COMPARING_KEY) ?
                JSON.parse(localStorage.getItem(PRODUCT_COMPARING_KEY)) : [];

              productList.push(productCode);
              localStorage.setItem(PRODUCT_COMPARING_KEY, JSON.stringify(productList));
            } else {
              //TODO
            }

            return new AddComparingProductSuccess({
              productCodeList: productList
            });
          }),
          catchError(error => of(new AddComparingProductFail(error)))
        );

      })
    );

  constructor(
    private actions$: Actions,
    private productComparingConnector: ProductComparingConnector,
    private userService: UserService,
  ) {
  }
}
