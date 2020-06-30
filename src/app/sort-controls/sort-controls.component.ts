import { Component, OnInit, ViewChild, Type, ElementRef, OnDestroy } from '@angular/core';
import { ProductsHandlerService, Product } from '../services/products-handler.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sort-controls',
    templateUrl: './sort-controls.component.html',
    styleUrls: ['./sort-controls.component.scss']
})
export class SortControlsComponent implements OnInit, OnDestroy {
    @ViewChild("type") type: ElementRef;

    public subscription: Subscription;
    public checkboxPrices = [
        { value: [0, 499], checked: false, text: '$0 - $499' },
        { value: [500, 999], checked: false, text: '$500 - $999' },
        { value: [1000, 1500], checked: false, text: '$1000 - $1500' }
    ]
    constructor(private productHandler: ProductsHandlerService) { }

    ngOnInit(): void {
        this.subscription = this.productHandler.searchPressed.subscribe((query: string) => {
            this.resetForSearch();

        })
    }

    typeChanged(type: string): void {
        this.productHandler.changedType.next(type);
    }

    checkPrice(index: number): void {
        this.checkboxPrices[index].checked = !this.checkboxPrices[index].checked;

        let ranges = [];
        this.checkboxPrices.forEach(price => {

            if (price.checked) {
                ranges.push(price.value);
            }

        })

        this.productHandler.filterPrice.next(ranges);

    }

    resetForSearch(): void {
        this.checkboxPrices.forEach(price => {
            price.checked = false;
        })

        this.type.nativeElement.value = 'all';
        this.productHandler.typeFilterData.apply = false;
        this.productHandler.priceFilterData.apply = false;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
