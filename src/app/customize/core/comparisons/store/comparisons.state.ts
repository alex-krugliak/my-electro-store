
export const COMPARING_FEATURE = 'comparisons';

export interface ComparisonsState {
  productComparing: ProductComparingListState;
}

export interface ProductComparingListState {
  productCodeList: string[];
}
