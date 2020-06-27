import { ShoppingActionTypes, ShoppingAction } from '../actions/shopping.actions';
import { Product } from '../../services/products-handler.service';

const initialState: Array<Product> = [

];

export function ShoppingReducer(state: Array<Product> = initialState, action: ShoppingAction) {
  switch (action.type) {
    case ShoppingActionTypes.ADD_ITEM:
      return [...state, action.payload];
    case ShoppingActionTypes.DELETE_ITEM:
      return state.filter((item: Product, index: number) => item.id !== action.payload.id || index !== action.payload.index);
    default:
      return state;
  }
}