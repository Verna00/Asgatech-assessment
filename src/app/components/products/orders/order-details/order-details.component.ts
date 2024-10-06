import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Orders, Product } from '../../../../interface/order';
import { OrdersService } from '../../../../Services/orders.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {

  orderId !: number;
  order:Orders|undefined =undefined

  constructor(private route: ActivatedRoute, private orderService: OrdersService) {

  }

ngOnInit(): void {
       // Get the orderId from the route parameters
       this.route.data.subscribe( async params => {
        this.order = params['order'];
        if(!this.order) return;
        debugger
        this.order.User = await this.orderService.apiGetUsersById(this.order.UserId);
        this.order.Products.forEach(async product => {
          product.Product = await this.orderService.apiGetProductsById(product.ProductId);
        })
    });
}

  handleQuantity(product: Product|undefined, quantity: string) {
    if(!product) return;
    if(quantity == '-'){
      if(product.Quantity > 0){
        product.Quantity = product.Quantity - 1;
      }
    }else{
      product.Quantity = product.Quantity + 1;
    }
  }
  calcPrice(product: Product|undefined) {
    if(!product || !product.Product) return;
    return product.Quantity * product.Product.ProductPrice;
  }

  sumOfOrder(order:Orders){
    return order.Products.map(product => product.Product?.ProductPrice??1 * product.Quantity).reduce((a, b) => a + b, 0)
  }
}
