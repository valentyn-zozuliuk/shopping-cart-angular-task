import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsHandlerService } from '../services/products-handler.service';

import { Store } from '@ngrx/store';
import { AddItemAction } from '../store/actions/shopping.actions';
import { AppState } from '../store/models/app-state.model';
import { Product } from '../services/products-handler.service';



@Component({
    selector: 'app-item-description',
    templateUrl: './item-description.component.html',
    styleUrls: ['./item-description.component.scss']
})
export class ItemDescriptionComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Product,
        public productHandler: ProductsHandlerService,
        public store: Store) { }

    ngOnInit(): void {
    }

    addToCart(): void {
        this.store.dispatch(new AddItemAction(this.data))
        this.productHandler.productAddedToCart.next();
    }

}
