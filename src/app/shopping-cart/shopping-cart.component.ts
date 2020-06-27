import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Product, ProductsHandlerService } from '../services/products-handler.service';
import { AppState } from '../store/models/app-state.model';
import { DeleteItemAction } from '../store/actions/shopping.actions';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  public productsObs: Observable<Array<Product>>;
  public productList: Array<Product> = [];
  public stars: number[] = [1,2,3,4,5];
  public subscription: Subscription;

  constructor(private store: Store<AppState>, public productHandler: ProductsHandlerService) { }

  ngOnInit(): void {
    this.productHandler.pageChanged.next(false);
    this.productsObs = this.store.select(store => store.shopping);
    this.subscription = this.productsObs.subscribe((data: Product[])=>{
      this.productList = data.slice();
      
    }); 
  }

  getTrueOrFalseClass(rating: string, i: number): boolean {
    return i < +rating;
  }

  deleteItem(id: number, index: number): void {
    this.store.dispatch(new DeleteItemAction({id, index}));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
