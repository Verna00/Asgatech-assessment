import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../Services/orders.service';
import { HttpClientModule } from '@angular/common/http';
import { NgClass, NgFor } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { Products } from '../../../interface/products';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Users } from '../../../interface/users';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
     HttpClientModule,
    NgClass,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgFor
  ],
  providers:[OrdersService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, AfterViewInit{

  products: Products[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  sortList: string[] = ['Price: Low to High', 'Price: High to Low'];
  productSelected:Products |undefined =undefined
  orderForm:FormGroup | undefined;
  Users:Users[] = []
  isCreateOrder: boolean = false
  constructor( private productService: OrdersService){

  }
  ngOnInit(): void {
    this.getProducts();
    this.getUsers();
    this.initalForm();
  }
  initalForm(){
    this.orderForm = new FormGroup({
      UserId:new FormControl(''),
      Products:new FormArray([]),
      PaymentType: new FormControl(''),
    })
  }

  setIsCreateOrder(){
    this.isCreateOrder = !this.isCreateOrder
  }
  closrIsCreateOrder(){
    this.isCreateOrder = false
  }
  get productsFormArray() {
    return this.orderForm?.get('Products') as FormArray;
  }


  addProduct(product: Products) {
    const productForm = new FormGroup({
      ProductId: new FormControl(product.ProductId),
      Quantity: new FormControl(product.quantity),
    })

    this.productsFormArray.push(productForm);
  }
  removeProduct(index: number) {
    this.productsFormArray.removeAt(index);
  }
  ngAfterViewInit(): void {
    initFlowbite();
  }
  getProducts(){
    this.productService.getProducts().subscribe(data => {
      this.products = data;


    });
  }
  getUsers(){
    this.productService.getUsers().subscribe(data => {
      this.Users = data;
    })
  }
  get isFavorite() {
    return this.paginatedProducts.some(product => product.isFavorite);
  }

    get paginatedProducts() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.products.slice(startIndex, startIndex + this.itemsPerPage);
    }

    totalPages() {
        return Math.ceil(this.products.length / this.itemsPerPage);
    }

    goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages()) {
          this.currentPage = page;
          console.log(`Current page updated to: ${this.currentPage}`);
      } else {
          console.log(`Page ${page} is out of bounds.`);
      }
  }

  handleSort(sortItem:string){
    if(sortItem == 'Price: Low to High'){
      this.paginatedProducts.sort((a, b) => a.ProductPrice - b.ProductPrice);
    }else if(sortItem == 'Price: High to Low'){
      this.paginatedProducts.sort((a, b) => b.ProductPrice - a.ProductPrice);
    }
  }

  addToFavorites(product: Products) {
    product.isFavorite = !product.isFavorite;
  }

  handleSelectItem(product: Products) {
    this.productSelected = product;
  }

  handleCloseModal() {
    this.productSelected = undefined;
  }

  handleQuantity(product: Products|undefined, quantity: string) {
    if(!product) return;
    if(quantity == '-'){
      if(product.AvailablePieces > 0){
        product.AvailablePieces = product.AvailablePieces - 1;
      }
    }else{
      product.AvailablePieces = product.AvailablePieces + 1;
    }
  }

  handleOrder(){
    this.productsFormArray.clear();
    this.productsFormArray.reset();
    this.orderForm?.reset();
    const items = this.paginatedProducts.filter(product => product.isFavorite);
    items.forEach(item => {
      this.addProduct(item);
    });
  }
  createOrder(){
    console.log(this.orderForm?.getRawValue());
  }

  getProductNamr(productId:number){
    return this.paginatedProducts.find(product => product.ProductId == productId)?.ProductName

  }
}

