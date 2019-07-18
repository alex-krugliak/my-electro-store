import {
  ADD_COMPARING_PRODUCT_SUCCESS,
  ComparingProductAction,
  LOAD_PRODUCT_COMPARING_SUCCESS,
  REMOVE_COMPARING_PRODUCT, REMOVE_COMPARING_PRODUCT_SUCCESS
} from '../actions/product-comparing.action';
import {ProductComparingListState} from '../comparisons.state';


export const initialState: ProductComparingListState = {
  productCodeList: null
};

export function reducer(
  state = initialState,
  action: ComparingProductAction
): ProductComparingListState {
  switch (action.type) {
    case LOAD_PRODUCT_COMPARING_SUCCESS: {
      const productCodeList = action.payload.productCodeList;

      return {
        ...state,
        productCodeList
      };
    }

    case ADD_COMPARING_PRODUCT_SUCCESS: {
      const productCodeList = action.payload.productCodeList;

      return {
        ...state,
        productCodeList
      };
    }

    case REMOVE_COMPARING_PRODUCT_SUCCESS: {
      const productCodeList = action.payload.productCodeList;

      return {
        ...state,
        productCodeList
      };
    }
  }

  return state;
}

