import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, filter, first, map, switchMap} from 'rxjs/operators';
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
import {Product, ProductService, StateWithUser, UsersSelectors} from '@spartacus/core';
import {ProductComparing} from '../comparisons.state';
import * as _ from 'lodash';
import {isDefined} from '../../../../utils/common.utils';
import {ProductComparingService} from '../facade/product-comparing.service';
import {select, Store} from '@ngrx/store';

export const PRODUCT_COMPARING_KEY = 'spartacus-product-comparing';

@Injectable()
export class ProductComparingEffects {
  @Effect()
  loadProductComparing$: Observable<LoadProductComparingSuccess | LoadProductComparingFail> =
    this.actions$.pipe(
      ofType(LOAD_DEFAULT_PRODUCT_COMPARING),
      switchMap(() => {
        return this.userStore.pipe(
          select(UsersSelectors.getDetails),
          map(user => {
          return user;
        }));
      }),
      switchMap(user => {

        if (Object.keys(user).length === 0) {

          const productList = localStorage.getItem(PRODUCT_COMPARING_KEY) ?
            JSON.parse(localStorage.getItem(PRODUCT_COMPARING_KEY)) : [];

          return this._getAllComparingProductsData(productList);
        } else {
          return this.productComparingConnector.get(user.uid).pipe(
            switchMap(productCodes => {
              this._clearLocalStorage();
              return this._getAllComparingProductsData(productCodes);
            }),
            catchError(error => of(new LoadProductComparingFail({
              message: error.message
            })))
          );
        }
      }),
    );

  @Effect()
  addComparingProduct$: Observable<AddComparingProductSuccess | AddComparingProductFail> =
    this.actions$.pipe(
      ofType(ADD_COMPARING_PRODUCT),
      map((action: AddComparingProduct) => action.payload),
      switchMap(productCode => {
        return this.userStore.pipe(
          select(UsersSelectors.getDetails),
          map(user => {
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
          this.productComparingService.updateProductComparingData();
          return of(new AddComparingProductSuccess({
            productCode: params.product
          }));
        } else {
          return this.productComparingConnector.addProduct(params.currentUser.uid, params.product).pipe(
            map(data => {
              this.productComparingService.updateProductComparingData();
              return new AddComparingProductSuccess(data);
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
        return this.userStore.pipe(
          select(UsersSelectors.getDetails),
          map(user => {
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

          this.productComparingService.updateProductComparingData();
          return of(new RemoveComparingProductSuccess());
        } else {
          return this.productComparingConnector.removeProduct(params.currentUser.uid, params.product).pipe(
            map(data => {
              this.productComparingService.updateProductComparingData();
              return new RemoveComparingProductSuccess();
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

  private _clearLocalStorage(): void {
    localStorage.setItem(PRODUCT_COMPARING_KEY, JSON.stringify([]));
  }

  private _getAllComparingProductsData(productCodeList: string[]): Observable<LoadProductComparingSuccess> {
    const occRequests = this._getRequestsForProductsData(productCodeList);

    return forkJoin(occRequests).pipe(
      map(result => {
        const comparingProducts = this._populateProductComparingState(result);
        return new LoadProductComparingSuccess({
          comparingProductList: comparingProducts
        });
      })
    );
  }

  private _getRequestsForProductsData(productCodeList: string[]): Observable<Product>[] {
    const occRequests = [];
    productCodeList.forEach(productCode => {
      occRequests.push(this.productService.get(productCode).pipe(
        filter(product => isDefined(product)),
        first()
      ));
    });

    return occRequests;
  }

  private _populateProductComparingState(productList: Product[]): ProductComparing[] {
    const groupedByCategory = _.groupBy(productList, product => product.categories[0].code);
    const comparingProducts = [];
    for (var categoryKey in groupedByCategory) {

      const categoryProducts = groupedByCategory[categoryKey];
      const categoryData = _.flatMap(categoryProducts, product => product.categories)
        .find(category => category.code === categoryKey);

      const productComparing: ProductComparing = {
        categoryProducts: categoryProducts,
        categoryCode: categoryData.code,
        categoryName: categoryData.name
      };
      comparingProducts.push(productComparing);
    }

    return comparingProducts
  }

  constructor(
    private actions$: Actions,
    private productComparingConnector: ProductComparingConnector,
    private userStore: Store<StateWithUser>,
    private productService: ProductService,
    private productComparingService: ProductComparingService
  ) {
  }
}
