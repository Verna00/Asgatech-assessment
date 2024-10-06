import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
      },
    {
        path: 'orders',
        loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule)
      },
    {
        path: 'users',
        loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule)
      },
];
