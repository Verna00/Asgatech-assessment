import { CommonModule, DatePipe, formatDate, NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../Services/orders.service';
import { Orders } from '../../../interface/order';
import { RouterLink, RouterModule } from '@angular/router';
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
  constructor(
    private orderService: OrdersService,
    private datePipe: DatePipe
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

  });

}
get paginatedOrders() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.orders.slice(startIndex, startIndex + this.itemsPerPage);
}
}
