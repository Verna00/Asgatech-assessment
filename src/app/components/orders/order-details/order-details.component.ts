import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../Services/orders.service';
import { Orders } from '../../../interface/order';
import { HttpClientModule } from '@angular/common/http';
import { Products } from '../../../interface/products';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [ HttpClientModule,DatePipe],
  providers:[OrdersService,DatePipe ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  orders: Orders[] = [];
  orderId !: number;
  order: any;
  DateConvert:any;
  products:Products[]=[];
  production:any
  filteredProducts: any[] = [];
  constructor(private route: ActivatedRoute,
    private orderService: OrdersService,
   
  ){

  }
  targetProduct:any;
ngOnInit(): void {
       // Get the orderId from the route parameters
       this.route.params.subscribe(params => {
        this.orderId = +params['id']; // The '+' converts the string to a number
        // Now you can use this.orderId to fetch order details
    });
    this.getOrders();
}


getOrders() {
  this.orderService.getOrders().subscribe((data) => {
    this.orders = data;

    // Subscribe to route params to get the orderId
    this.route.params.subscribe(params => {
      this.orderId = +params['id']; // Convert string to number

      // Filter orders to find the specific order
      this.order = this.orders.find(order => order.OrderId === this.orderId);
      console.log();
      this.targetProduct=this.order.Products
      this.targetProduct.forEach((obj:any) => {
  
        this.production =obj.ProductId
       
        console.log(  this.production ,);
        
      })
      this.filteredProducts = this.targetProduct.flatMap((target: any) => {
        console.log('Comparing with Target Product ID:', target.ProductId);
        const matches = this.products.filter(product => {
          console.log('Checking Product ID:', product.ProductId);
          return product.ProductId === target.ProductId;
        });
        console.log('Matches found:', matches);
        return matches;
      });
    });
  })
  }

 
 
  

}




