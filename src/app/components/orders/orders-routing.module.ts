import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';

import { getOrderDetailsResolver } from '../../utils/resolver/GetOrderDetails.resolver';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {path:'',component : OrderListComponent},
  {path:'details/:id',component : OrderDetailsComponent , resolve: { order: getOrderDetailsResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
