import {Product} from '@spartacus/core';

export const COMPARING_FEATURE = 'comparisons';

export interface ComparisonsState {
  productComparing: ProductComparingListState;
}

export interface ProductComparing {
  categoryProducts: Product[];
  categoryCode: string;
  categoryName: string;
}

export interface ProductComparingListState {
  comparingProductList: ProductComparing[];
}
