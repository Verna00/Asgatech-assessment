import { CommonModule, DatePipe, formatDate, NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../Services/orders.service';
import { Orders, Product } from '../../../interface/order';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    HttpClientModule,
    NgClass,
    NgIf,
    RouterLink,
    RouterModule,
    CommonModule,
    NgxPaginationModule,
  DatePipe],
    providers:[OrdersService,DatePipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  orders: Orders[] = [];
  orderlist:any[]=[]
  currentPage: number = 1;
  itemsPerPage: number = 10;
  DateConvert:any
  isLoading:boolean=false
  order:Orders|undefined =undefined
  constructor(
    private orderService: OrdersService,

  ){

  }
 ngOnInit(): void {

this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
      this.orders.forEach(obj => {
        if (obj.OrderId > 1) {
          this.DateConvert=new Date(obj.OrderDate).toLocaleString() // Logs each object with id greater than 1
        
        }
    });

      const savedOrder = localStorage.getItem('orders');
      if (savedOrder) {
        const list = JSON.parse(savedOrder);
        this.orders = [...list];
      }
  });

}



sumOfOrder(order: Orders): number {
  order.Products.forEach(async product => {
    product.Product = await this.orderService.apiGetProductsById(product.ProductId);
  })
  return order.Products.reduce((total, currentProduct) => {
    // Access the product price
    const priceProduct = currentProduct.Product?.ProductPrice; // Use optional chaining
    // Calculate the price
    const price = currentProduct.Quantity * (priceProduct||0); // Use 0 if priceProduct is undefined
    return total + price; // Add the calculated price to the total
  }, 0);
}






get paginatedOrders() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.orders.slice(startIndex, startIndex + this.itemsPerPage);
}
}
