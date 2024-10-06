import type { ResolveFn } from '@angular/router';
import { OrdersService } from '../../Services/orders.service';
import { inject } from '@angular/core';

export const getOrderDetailsResolver: ResolveFn<any> = (route, state) => {
  const id = route.paramMap.get('id');
  if (!id) {
    return undefined;
  }
 const order = inject(OrdersService).apiGetOrderById(+id)
  return  order;
};
