import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsHandlerService } from '../services/products-handler.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Product } from '../services/products-handler.service';
import { AppState } from '../store/models/app-state.model';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public searchInput: string = "";
    public products: Observable<Product[]>;
    public numberOfProducts: number = 0;
    public onProductsPage: boolean = true;
    public subscriptions: Subscription[] = [];


    constructor(private productHandler: ProductsHandlerService, public store: Store<AppState>) { }

    ngOnInit(): void {
        this.subscriptions.push(this.productHandler.changedType.subscribe((data: string) => {
            this.searchInput = "";
        }));

        this.subscriptions.push(this.productHandler.filterPrice.subscribe((data: number[]) => {
            this.searchInput = "";
        }));

        this.subscriptions.push(this.productHandler.pageChanged.subscribe((ifProduct: boolean) => {
            this.onProductsPage = ifProduct;

            if (ifProduct) {
                this.searchInput = "";
            }
        }));

        this.products = this.store.select(store => store.shopping);

        this.subscriptions.push(this.products.subscribe((data: Product[]) => {
            this.numberOfProducts = data.length;
        }));

    }

    search(): void {
        this.productHandler.searchPressed.next(this.searchInput);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => {
            sub.unsubscribe();
        })
    }
}
