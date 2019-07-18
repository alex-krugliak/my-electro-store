import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ProductComparingConnector} from '../../connectors/product-comparing.connector';
import {
  ADD_COMPARING_PRODUCT,
  AddComparingProduct,
  AddComparingProductFail,
  AddComparingProductSuccess,
  LOAD_DEFAULT_PRODUCT_COMPARING,
  LoadProductComparingFail,
  LoadProductComparingSuccess,
  REMOVE_COMPARING_PRODUCT,
  RemoveComparingProduct,
  RemoveComparingProductFail,
  RemoveComparingProductSuccess
} from '../actions/product-comparing.action';
import {UserService} from '@spartacus/core';

export const PRODUCT_COMPARING_KEY = 'spartacus-product-comparing';

@Injectable()
export class ProductComparingEffects {
  @Effect()
  loadProductComparing$: Observable<LoadProductComparingSuccess | LoadProductComparingFail> =
    this.actions$.pipe(
      ofType(LOAD_DEFAULT_PRODUCT_COMPARING),
      switchMap(() => {
        return this.userService.get().pipe(map(user => {
          return user;
        }));
      }),
      switchMap(user => {
        if (Object.keys(user).length === 0) {

          const productList = localStorage.getItem(PRODUCT_COMPARING_KEY) ?
            JSON.parse(localStorage.getItem(PRODUCT_COMPARING_KEY)) : [];

          return of(new LoadProductComparingSuccess({
            productCodeList: productList
          }));
        } else {
          return this.productComparingConnector.get(user.uid).pipe(
            map(data => {
              return new LoadProductComparingSuccess({
                productCodeList: data
              });
            }),
            catchError(error => of(new LoadProductComparingFail({
              message: error.message
            })))
          );
        }
      })
    );

  @Effect()
  addComparingProduct$: Observable<AddComparingProductSuccess | AddComparingProductFail> =
    this.actions$.pipe(
      ofType(ADD_COMPARING_PRODUCT),
      map((action: AddComparingProduct) => action.payload),
      switchMap(productCode => {
        return this.userService.get().pipe(map(user => {
          return {
            currentUser: user,
            product: productCode
          };
        }));
      }),
      switchMap(params => {
        if (Object.keys(params.currentUser).length === 0) {

          let productList = localStorage.getItem(PRODUCT_COMPARING_KEY) ?
            JSON.parse(localStorage.getItem(PRODUCT_COMPARING_KEY)) : [];

          if (!productList.includes(params.product)) {
            productList.push(params.product);
            localStorage.setItem(PRODUCT_COMPARING_KEY, JSON.stringify(productList));
          }

          return of(new AddComparingProductSuccess({
            productCodeList: productList
          }));
        } else {
          return this.productComparingConnector.addProduct(params.currentUser.uid, params.product).pipe(
            map(data => {
              return new AddComparingProductSuccess({
                productCodeList: data
              });
            }),
            catchError(error => {
              return of(new AddComparingProductFail({
                message: params.product
              }));
            })
          );
        }
      })
    );

  @Effect()
  removeComparingProduct$: Observable<RemoveComparingProductSuccess | RemoveComparingProductFail> =
    this.actions$.pipe(
      ofType(REMOVE_COMPARING_PRODUCT),
      map((action: RemoveComparingProduct) => action.payload),
      switchMap(productCode => {
        return this.userService.get().pipe(map(user => {
          return {
            currentUser: user,
            product: productCode
          };
        }));
      }),
      switchMap(params => {
        if (Object.keys(params.currentUser).length === 0) {

          let productList = localStorage.getItem(PRODUCT_COMPARING_KEY) ?
            JSON.parse(localStorage.getItem(PRODUCT_COMPARING_KEY)) : [];

          const index = productList.indexOf(params.product);    // <-- Not supported in <IE9
          if (index !== -1) {
            productList.splice(index, 1);
          }
          localStorage.setItem(PRODUCT_COMPARING_KEY, JSON.stringify(productList));

          return of(new RemoveComparingProductSuccess({
            productCodeList: productList
          }));
        } else {
          return this.productComparingConnector.removeProduct(params.currentUser.uid, params.product).pipe(
            map(data => {
              return new RemoveComparingProductSuccess({
                productCodeList: data
              });
            }),
            catchError(error => {
              return of(new RemoveComparingProductFail({
                message: params.product
              }));
            })
          );
        }
      })
    );

  constructor(
    private actions$: Actions,
    private productComparingConnector: ProductComparingConnector,
    private userService: UserService,
  ) {
  }
}
