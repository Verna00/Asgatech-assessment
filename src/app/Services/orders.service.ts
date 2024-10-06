import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Orders, Product } from '../interface/order';
import { Users } from '../interface/users';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orders: Orders[] = [];

  private ordersUrl = '../../assets/DB/orders.json';
  private usersUrl = '../../assets/DB/users.json';
  private productsUrl = '../../assets/DB/porducts.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.productsUrl);
  }
  getOrders(): Observable<any> {
    return this.http.get<any>(this.ordersUrl);
  }

  apiGetOrderById(orderId: number) {
    return  this.http.get<any>(this.ordersUrl).pipe(map((data: any) => {
      const order = data.find((order: Orders) => order.OrderId === orderId)
      if(!order){
        const storge = localStorage.getItem('orders');
        if(storge){
          const list = JSON.parse(storge);
          return list.find((order: Orders) => order.OrderId === orderId);
        }else{
          throw new Error('Order not found')
        }
      }else{
        return order
      };
    }) );
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl);
  }

  getOrderDetails(orderId: number): Orders | undefined {
    return this.orders.find(order => order.OrderId === orderId);
}

apiGetProductsById(productId: number) {
  return this.http.get<any>(this.productsUrl).pipe(map((data: any) => data.find((product: Product) => product.ProductId === productId))).toPromise();
}

apiGetUsersById(userId: string) {
  return this.http.get<any>(this.usersUrl).pipe(map((data: any) => data.find((user: Users) => user.Id === userId))).toPromise();
}
}
