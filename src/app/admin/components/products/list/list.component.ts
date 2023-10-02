import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { BaseResponse } from 'src/app/contracts/base-response';
import { Product } from 'src/app/contracts/product';
import { AlertifyService, MessagePositions, MessageTypes } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/admin/product.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {
  updateFromList(_t14: number) {
    throw new Error('Method not implemented.');
  }
  products: any;
  beforeClick: string = "";
  beforeDirection: number = 0;

  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private router: Router) {
    super(spinner);
  }

  ngOnInit() {
    this.getAllProduct();
  }

  async getAllProduct() {
    this.showSpinner(SpinnerTypes.BallElasticDots);
    var response: BaseResponse = await this.productService.getAll();
    this.hideSpinner(SpinnerTypes.BallElasticDots);
    if (response.success) {
      this.products = response.data;
      console.log(this.products);
      //this.alertify.message(`All products brought`, MessageTypes.Success, MessagePositions.TopRight, 5);
    }
    else {
      this.alertify.message(`Error occurred : ${response.error?.message}`, MessageTypes.Error, MessagePositions.TopRight, 10);
      //this.router.navigate(['admin/dashboard']);
    }
  }

  convertDateTime(dateString: string): string {
    //const formattedDate = this.datePipe.transform(originalDate, 'yyyy-MM-dd HH:mm:ss');
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    if (year < 10) return "--"
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  async deleteFromList(index: number) {
    const result = window.confirm('Are you sure you want to delete this product?');
    if (result) {
      let productId: string = this.products[index].id;
      this.showSpinner(SpinnerTypes.BallElasticDots);
      var response: BaseResponse = await this.productService.delete(productId)
      this.hideSpinner(SpinnerTypes.BallElasticDots);
      if (response.success) {
        this.products = response.data;
        console.log(this.products);
        this.alertify.message(`Product deletet with Id : ${productId}`, MessageTypes.Success, MessagePositions.TopRight, 5);
        this.refreshList();
      }
      else {
        this.alertify.message(`Error occurred : ${response.error?.message}`, MessageTypes.Error, MessagePositions.TopRight, 10);
      }
    }
  }

  refreshList() {
    this.getAllProduct();
  }

  
  sort(columbName: string){
    if(this.beforeClick == columbName){
      if(this.beforeDirection == 0){
        this.products.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => (a[columbName] > b[columbName] ? 1 : -1));
      }
      else{
        this.products.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => (a[columbName] < b[columbName] ? 1 : -1));
      }
    }
    else{
      this.products.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => (a[columbName] > b[columbName] ? 1 : -1));
    }
    this.beforeDirection = this.beforeDirection == 1 ? 0 : 1;
    this.beforeClick = columbName;
  
  }
}

