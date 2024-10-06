import { Products } from "./products";
import { Users } from "./users";

export interface Orders {
  OrderId:     number;
  OrderDate:   string;
  UserId:      string;
  User?:       Users;
  Products:    Product[];
  PaymentType: string;
}

export interface Product {
  ProductId: number;
  Product?:  Products;
  Quantity:  number;
}
