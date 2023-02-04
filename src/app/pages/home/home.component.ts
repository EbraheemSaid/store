import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreAPIService } from 'src/app/services/store-api.service';

const ROWS_HEIGHT: { [id:number]: number } = { 1: 400 , 3: 355 , 4: 350 }

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy{

  columns = 3;
  rowHeight = ROWS_HEIGHT[this.columns]
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productSubscription: Subscription | undefined;


  constructor(private cartService: CartService, private storeApiService: StoreAPIService) {}

  ngOnInit(): void {
    this.getProducts();

  }
  
  // to avoid memory leaks
  ngOnDestroy(): void {
    if(this.productSubscription) {
      this.productSubscription.unsubscribe()
    }
  }

  getProducts(): void {
    this.productSubscription = this.storeApiService.getAllProducts(this.count,this.sort,this.category)
    .subscribe((_products) => {
      this.products = _products
    })
   }

  onColumnsCountChange(columnsNumber: number): void { 
    this.columns = columnsNumber
    this.rowHeight = ROWS_HEIGHT[this.columns]
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts()
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product:product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id

    })

  }
  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }
  onSortChange(newSort: string): void {
    this.sort= newSort;
    this.getProducts();

  }
}
