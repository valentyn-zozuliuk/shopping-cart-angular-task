import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { zip, of, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root' 
})
export class ProductsHandlerService {
  public changedType = new Subject<string>();
  public filterPrice = new Subject<number[]>();
  public searchPressed = new Subject<string>();
  public productAddedToCart = new Subject<any>();
  public pageChanged = new Subject<boolean>();

  public typeFilterData: { currentValue: string, apply: boolean } = { currentValue: "", apply: false };
  public priceFilterData: { currentValue: any[] | string, apply: boolean } = { currentValue: "", apply: false };

  public apiLink = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {

  }

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.apiLink)
      .pipe(
        catchError((val)=> {
          console.log(`Http error: ${val}`);
          return of([]);
        })
      )

  }

  fetchAPI(url: string, twoRequests: boolean, futureLink: string): Observable<Product[]> {

    if(twoRequests) {
      return zip(
          this.http.get<Product[]>(url)
            .pipe(
              catchError((val)=> {
                console.log(`Http error: ${val}`);
                return of([]);
              })
            ),
          
          this.http.get<Product[]>(futureLink)
            .pipe(
              catchError((val)=> {
                console.log(`Http error: ${val}`);
                return of([]);
              })
            ),
        ).pipe(
          map((data) => {
            return [...data[0], ...data[1]];
          })
        );
    }else{
      return this.http.get<Product[]>(url)
        .pipe(
          catchError((val)=> {
            console.log(`Http error: ${val}`);
            return of([]);
          }),
        )
    }

  }

  sortProductsByFilters(): Observable<Product[]> {

    let currentLink = this.apiLink;
    
    if(this.priceFilterData.apply && this.typeFilterData.apply) {
      currentLink += `?type=${this.typeFilterData.currentValue}&price_gte=${this.priceFilterData.currentValue[0][0]}&price_lte=${this.priceFilterData.currentValue[0][1]}`;
    } else if(this.priceFilterData.apply) {
      currentLink += `?price_gte=${this.priceFilterData.currentValue[0][0]}&price_lte=${this.priceFilterData.currentValue[0][1]}`;
    } else if(this.typeFilterData.apply) {
      currentLink += `?type=${this.typeFilterData.currentValue}`;
    }
    
    let twoRequests = false;
    let futureLink = "";
    
    if(this.priceFilterData.currentValue.length === 2 && this.priceFilterData.apply) {
      twoRequests = true;

      if(this.typeFilterData.apply){
        futureLink = this.apiLink + `?type=${this.typeFilterData.currentValue}&price_gte=${this.priceFilterData.currentValue[1][0]}&price_lte=${this.priceFilterData.currentValue[1][1]}`;
      } else {
        futureLink = this.apiLink + `?price_gte=${this.priceFilterData.currentValue[1][0]}&price_lte=${this.priceFilterData.currentValue[1][1]}`;

      } 
      
    }
      
    return this.fetchAPI(currentLink, twoRequests, futureLink);

  }

  searchByQuery(query: string): Observable<Product[]> {
    let currentLink = this.apiLink + `?q=${query}`;
    return this.fetchAPI(currentLink, false, "");
  }
  

}

export interface Product {
  id: number,
  name: string,
  type: string,
  rating: string,
  price: number,
  image: string,
  desc: string,
  reviews: {user: string, text: string}[]
}