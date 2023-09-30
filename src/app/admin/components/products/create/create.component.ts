import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { BaseResponse } from 'src/app/contracts/base-response';
import { Product } from 'src/app/contracts/product';
import { AlertifyService, MessagePositions, MessageTypes } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/admin/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],

})
export class CreateComponent extends BaseComponent {

  createProductForm: FormGroup;

  fieldErrors = {
    productName: true,
    productPrice: true,
    productStock: true,
  };

  constructor(private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder) {
    super(spinner)
    this.createProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productPrice: [0, [Validators.required, Validators.min(0)]],
      productStock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  async saveProduct() {
    if (!this.createProductForm.valid) {
      return;
    }
    this.showSpinner(SpinnerTypes.BallElasticDots);
    var product: Product = {
      name: this.createProductForm.get("productName")?.value,
      price: this.createProductForm.get("productPrice")?.value,
      stock: this.createProductForm.get("productStock")?.value
    };

    var response: BaseResponse = await this.productService.create(product);
    this.hideSpinner(SpinnerTypes.BallElasticDots);
    console.log(response);
    if (response.success) {
      this.alertify.message(`Product created!`, MessageTypes.Success, MessagePositions.TopRight, 5);
    }
    else {
      this.alertify.message(`Error occurred : ${response.error?.message}`, MessageTypes.Error, MessagePositions.TopRight, 10);
    }
    //test için kapatıldı
    //this.createProductForm.reset();
  }

  nameOnInputBlur() {
    this.fieldErrors.productName = !!this.createProductForm.get("productName")?.valid;
    console.log(this.fieldErrors);
  }

  priceOnInputBlur() {
    this.fieldErrors.productPrice = !!this.createProductForm.get("productPrice")?.valid;
    console.log(this.fieldErrors);
  }

  stockOnInputBlur() {
    this.fieldErrors.productStock = !!this.createProductForm.get("productStock")?.valid;
    console.log(this.fieldErrors);
  }
}
