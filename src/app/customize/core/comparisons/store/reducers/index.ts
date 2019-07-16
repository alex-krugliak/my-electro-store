import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as fromComparing from './product-comparing.reducer';
import {InjectionToken, Provider} from '@angular/core';
import {LOAD_PRODUCT_COMPARING_FAIL} from '../actions/product-comparing.action';
import {ComparisonsState} from '../comparisons.state';

export function getReducers(): ActionReducerMap<ComparisonsState> {
  return {
    productComparing: fromComparing.reducer
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<ComparisonsState>> =
  new InjectionToken<ActionReducerMap<ComparisonsState>>('ComparingReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearProductComparingState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    if (action.type === LOAD_PRODUCT_COMPARING_FAIL) {
      debugger;
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearProductComparingState];
