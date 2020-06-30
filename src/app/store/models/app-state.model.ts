import { Product } from '../../services/products-handler.service';

export interface AppState {
    readonly shopping: Array<Product>
}