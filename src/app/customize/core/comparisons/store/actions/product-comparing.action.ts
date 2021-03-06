import {Action} from '@ngrx/store';

export const LOAD_DEFAULT_PRODUCT_COMPARING = '[Comparing] Load default Comparing Data';
export const LOAD_PRODUCT_COMPARING_FAIL = '[Comparing] Load Comparing Data Fail';
export const LOAD_PRODUCT_COMPARING_SUCCESS = '[Comparing] Load Comparing Data Success';
export const ADD_COMPARING_PRODUCT = '[Comparing] Add Product to Comparing';
export const ADD_COMPARING_PRODUCT_FAIL = '[Comparing] Add Product to Comparing Fail';
export const ADD_COMPARING_PRODUCT_SUCCESS = '[Comparing] Add Product to Comparing Success';
export const REMOVE_COMPARING_PRODUCT = '[Comparing] Remove Product from Comparing';
export const REMOVE_COMPARING_PRODUCT_FAIL = '[Comparing] Remove Product from Comparing Fail';
export const REMOVE_COMPARING_PRODUCT_SUCCESS = '[Comparing] Remove Product from Comparing Success';

export class LoadDefaultProductComparing implements Action {
  readonly type = LOAD_DEFAULT_PRODUCT_COMPARING;

  constructor() {
  }
}

export class LoadProductComparingFail implements Action {
  readonly type = LOAD_PRODUCT_COMPARING_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadProductComparingSuccess implements Action {
  readonly type = LOAD_PRODUCT_COMPARING_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AddComparingProduct implements Action {
  readonly type = ADD_COMPARING_PRODUCT;

  constructor(public payload: string) {
  }
}

export class AddComparingProductFail implements Action {
  readonly type = ADD_COMPARING_PRODUCT_FAIL;

  constructor(public payload: any) {
  }
}

export class AddComparingProductSuccess implements Action {
  readonly type = ADD_COMPARING_PRODUCT_SUCCESS;

  constructor(public payload: any) {
  }
}

export class RemoveComparingProduct implements Action {
  readonly type = REMOVE_COMPARING_PRODUCT;

  constructor(public payload: string) {
  }
}

export class RemoveComparingProductFail implements Action {
  readonly type = REMOVE_COMPARING_PRODUCT_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveComparingProductSuccess implements Action {
  readonly type = REMOVE_COMPARING_PRODUCT_SUCCESS;

  constructor() {
  }
}

// action types
export type ComparingProductAction =
  | LoadDefaultProductComparing
  | LoadProductComparingFail
  | LoadProductComparingSuccess
  | AddComparingProduct
  | AddComparingProductFail
  | AddComparingProductSuccess
  | RemoveComparingProduct
  | RemoveComparingProductFail
  | RemoveComparingProductSuccess;
