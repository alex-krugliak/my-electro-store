import {COMPARING_FEATURE, ComparisonsState} from '../comparisons.state';
import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';


export const getProductComparingState: MemoizedSelector<ComparisonsState, ComparisonsState> =
  createFeatureSelector<ComparisonsState>(COMPARING_FEATURE);


export const getProductComparingList: MemoizedSelector<ComparisonsState, string[]> =
  createSelector(getProductComparingState, (state: ComparisonsState) => {
    return state.productComparing.productCodeList;
  });
