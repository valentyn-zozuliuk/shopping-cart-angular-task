import { Component, OnInit, Input } from '@angular/core';
import { ProductsHandlerService } from '../services/products-handler.service';
import { Product } from '../services/products-handler.service';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  @Input() product: Product
  public stars: number[] = [1,2,3,4,5];

  constructor() { }

  ngOnInit(): void {
  }

  getTrueOrFalseClass(rating: string, i: number): boolean {
    return i < +rating;
  }
}
