import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsHandlerService } from '../services/products-handler.service';
import { Product } from '../services/products-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemDescriptionComponent } from '../item-description/item-description.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {

    public products: Array<Product> = [];
    public p: number = 1;
    public subscriptions: Subscription[] = [];

    constructor(private productHandler: ProductsHandlerService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.productHandler.pageChanged.next(true);

        this.subscriptions.push(this.productHandler.getProducts().subscribe(
            (data: Array<Product>) => {
                this.products = data.slice();
            },
            err => console.log('Initial error', err)
        ));

        this.subscriptions.push(this.productHandler.changedType.subscribe(
            (type: string) => {
                //reset to 1 pagination page
                this.p = 1;

                if (type === 'all') {
                    this.productHandler.typeFilterData.apply = false;
                    this.productHandler.typeFilterData.currentValue = "";
                } else {

                    this.productHandler.typeFilterData.apply = true;
                    this.productHandler.typeFilterData.currentValue = type;
                }

                this.subscriptions.push(this.productHandler.sortProductsByFilters()
                    .subscribe(
                        (data: Array<Product>) => {
                            this.products = data.slice();
                        },
                        err => console.log('Error in sorting by type', err)
                    ));
            },
            err => console.log('HTTP Error', err)
        ));

        this.subscriptions.push(this.productHandler.filterPrice.subscribe(
            (prices: number[]) => {
                //reset to 1 pagination page
                this.p = 1;

                this.productHandler.priceFilterData.apply = true;
                this.productHandler.priceFilterData.currentValue = prices;

                if (prices.length === 0 || prices.length > 2) {
                    this.productHandler.priceFilterData.apply = false;
                    this.productHandler.priceFilterData.currentValue = "";
                }

                this.subscriptions.push(this.productHandler.sortProductsByFilters()
                    .subscribe(
                        (data: Array<Product>) => {
                            this.products = data.slice();
                        },
                        err => console.log('Error in sorting by type', err)
                    ));
            },
            err => console.log('Error in sorting by price', err)
        ));

        this.subscriptions.push(this.productHandler.searchPressed.subscribe((query: string) => {
            //reset to 1 pagination page
            this.p = 1;

            this.subscriptions.push(this.productHandler.searchByQuery(query).subscribe((data: Product[]) => {
                this.products = data.slice();
            }));

        }));

        this.subscriptions.push(this.productHandler.productAddedToCart.subscribe(() => {

            this.snackBar.open('Item Added', 'Seen', {
                duration: 2000
            });

        }));
    }

    singleProductClicked(product): void {
        let dialogRef = this.dialog.open(ItemDescriptionComponent, {
            width: '600px',
            data: product
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => {
            sub.unsubscribe();
        })

    }

}
