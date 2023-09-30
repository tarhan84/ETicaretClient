import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { BaseResponse } from 'src/app/contracts/base-response';
import { AlertifyService, MessagePositions, MessageTypes } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/admin/product.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {
  products: any;

  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService) {
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

    if(year < 10) return "--"
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
}

