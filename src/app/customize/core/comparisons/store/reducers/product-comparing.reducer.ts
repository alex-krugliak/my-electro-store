import {ComparingProductAction, LOAD_PRODUCT_COMPARING_SUCCESS} from '../actions/product-comparing.action';
import {ProductComparingListState} from '../comparisons.state';


export const initialState: ProductComparingListState = {
  comparingProductList: null
};

export function reducer(
  state = initialState,
  action: ComparingProductAction
): ProductComparingListState {
  switch (action.type) {
    case LOAD_PRODUCT_COMPARING_SUCCESS: {
      const comparingProductList = action.payload.comparingProductList;
      return {
        ...state,
        comparingProductList
      };

    }

  }

  return state;
}

