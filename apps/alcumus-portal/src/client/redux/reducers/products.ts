import { Product } from '../../../common/types';

export interface ProductsReducerState {
  products: Product[];
}

export const defaultState: ProductsReducerState = {
  products: [],
};

export default function productsReducer(
  state: ProductsReducerState = defaultState
) {
  return state;
}
