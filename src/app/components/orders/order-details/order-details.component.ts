import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

import { DecimalPipe, NgIf } from '@angular/common';
import { OrdersService } from '../../../Services/orders.service';
import { Orders, Product } from '../../../interface/order';
import { Products } from '../../../interface/products';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [DecimalPipe,RouterLink,RouterModule,NgIf],
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
    return product.Quantity * product.Product.ProductPrice; //calc pricesproduct with quantity
  }


  
  
  sumOfOrder(order: Orders): number {
    return order.Products.reduce((total, product) => {
      const productPrice = product.Product?.ProductPrice ?? 1; // Default to 1 if price is undefined
      return total + (productPrice * product.Quantity);
    }, 0);
  }

}
