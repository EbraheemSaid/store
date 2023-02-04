import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private _cart : Cart = { items: [] };
  itemsQuantity = 0;

  constructor(private cartService: CartService){}

  @Input()
  get cart(): Cart {
    return this._cart
  }
  set cart(cart: Cart) {
    this._cart = cart
    this.itemsQuantity = cart.items
    .map((item) => item.quantity)
    .reduce((prev,curr) => curr + prev , 0)
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart()
  }

}
