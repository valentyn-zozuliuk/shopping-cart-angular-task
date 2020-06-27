import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store'; 
import { ShoppingReducer } from './store/reducers/shopping.reducer';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { ItemDescriptionComponent } from './item-description/item-description.component';
import { SortControlsComponent } from './sort-controls/sort-controls.component';
import { ListComponent } from './list/list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingleItemComponent,
    ItemDescriptionComponent,
    SortControlsComponent,
    ListComponent,
    ShoppingCartComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      shopping: ShoppingReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
