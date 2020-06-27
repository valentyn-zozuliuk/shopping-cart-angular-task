import { Action } from '@ngrx/store';
import { Product } from '../../services/products-handler.service';

export enum ShoppingActionTypes {
  ADD_ITEM = '[SHOPPING] Add Item',
  DELETE_ITEM = '[SHOPPING] Delete Item'
}

export class AddItemAction implements Action {
  readonly type = ShoppingActionTypes.ADD_ITEM

  constructor(public payload: Product) { }
}

export class DeleteItemAction {
  readonly type = ShoppingActionTypes.DELETE_ITEM

  constructor(public payload: {id: number, index: number}) { }
}
 
export type ShoppingAction = AddItemAction | DeleteItemAction