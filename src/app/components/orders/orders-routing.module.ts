import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from '../products/orders/order-details/order-details.component';
import { getOrderDetailsResolver } from '../../utils/resolver/GetOrderDetails.resolver';

const routes: Routes = [
  {path:'',component : OrderListComponent},
  {path:'details/:id',component : OrderDetailsComponent , resolve: { order: getOrderDetailsResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
