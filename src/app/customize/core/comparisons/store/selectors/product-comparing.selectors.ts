import {COMPARING_FEATURE, ComparisonsState, ProductComparing} from '../comparisons.state';
import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';


export const getProductComparingState: MemoizedSelector<ComparisonsState, ComparisonsState> =
  createFeatureSelector<ComparisonsState>(COMPARING_FEATURE);


export const getProductComparingList: MemoizedSelector<ComparisonsState, ProductComparing[]> =
  createSelector(getProductComparingState, (state: ComparisonsState) => {
    return state.productComparing.comparingProductList;
  });
