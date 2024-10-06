import { CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../Services/orders.service';
import { Users } from '../../../interface/users';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [ HttpClientModule,
    CommonModule ,
    NgClass,
   
    NgIf],
    providers:[OrdersService,DatePipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
users:Users[]=[]
showTooltip: boolean = true;

constructor( private orderService: OrdersService){

}
ngOnInit(): void {
  this.getOrders();
}

getOrders(){
  this.orderService.getUsers().subscribe((data) => {
    this.users = data;
    console.log(this.users ,'');
    
 
  
});
}

}
