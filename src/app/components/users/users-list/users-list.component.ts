import { CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../Services/orders.service';
import { Users } from '../../../interface/users';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [ HttpClientModule,
    CommonModule ,
    NgClass,
    NgxPaginationModule,
    NgIf],
    providers:[OrdersService,DatePipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
users:Users[]=[]
showTooltip: boolean = true;
currentPage: number = 1;
itemsPerPage: number = 10;

constructor( private orderService: OrdersService){

}
ngOnInit(): void {
  this.getOrders();
}

getOrders(){
  this.orderService.getUsers().subscribe((data) => {
    this.users = data;
   
    
 
  
});
}
get paginatedUsers() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.users.slice(startIndex, startIndex + this.itemsPerPage);
}

}
