import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { BaseResponse } from 'src/app/contracts/base-response';
import { Product } from 'src/app/contracts/product';
import { AlertifyService, MessagePositions, MessageTypes } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/admin/product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent extends BaseComponent{
  updateProductForm: FormGroup;

  fieldErrors = {
    productId: false,
    productName: true,
    productPrice: true,
    productStock: true,
  };

  constructor(private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder) {
    super(spinner)
    this.updateProductForm = this.formBuilder.group({
      productId :['', Validators.required],
      productName: ['', Validators.required],
      productPrice: [null, [Validators.required, Validators.min(0)]],
      productStock: [null, [Validators.required, Validators.min(0)]]
    });
  }

  async updateProduct() {
    if (!this.updateProductForm.valid) {
      return;
    }
    this.showSpinner(SpinnerTypes.BallElasticDots);
    var product: Product = {
      id: this.updateProductForm.get("productId")?.value,
      name: this.updateProductForm.get("productName")?.value,
      price: this.updateProductForm.get("productPrice")?.value,
      stock: this.updateProductForm.get("productStock")?.value
    };

    var response: BaseResponse = await this.productService.update(product);
    this.hideSpinner(SpinnerTypes.BallElasticDots);
    console.log(response);
    if (response.success) {
      this.alertify.message(`Product Updated!`, MessageTypes.Success, MessagePositions.TopRight, 5);
    }
    else {
      this.alertify.message(`Error occurred : ${response.error?.message}`, MessageTypes.Error, MessagePositions.TopRight, 10);
    }
    this.updateProductForm.reset();
    this.updateProductForm.get('productId')?.setValue(product.id);
  }

  nameOnInputBlur() {
    this.fieldErrors.productName = !!this.updateProductForm.get("productName")?.valid;
    console.log(this.fieldErrors);
  }

  priceOnInputBlur() {
    this.fieldErrors.productPrice = !!this.updateProductForm.get("productPrice")?.valid;
    console.log(this.fieldErrors);
  }

  stockOnInputBlur() {
    this.fieldErrors.productStock = !!this.updateProductForm.get("productStock")?.valid;
    console.log(this.fieldErrors);
  }

  idOnInputBlur() {
    this.fieldErrors.productId = !!this.updateProductForm.get("productId")?.valid;
    console.log(this.fieldErrors);
  }

  async getProduct(){
    var productId: string = this.updateProductForm.get('productId')?.value;
    this.showSpinner(SpinnerTypes.BallElasticDots);
    var result = await this.productService.get(productId);
    this.hideSpinner(SpinnerTypes.BallElasticDots);
    console.log(result);
    if (result.success) {
      if(result.data == null){
        this.alertify.message(`Product not found with id : ${productId}`, MessageTypes.Warning, MessagePositions.TopRight, 10);
        return;
      }
      this.alertify.message(`Product received!`, MessageTypes.Success, MessagePositions.TopRight, 5);
    }
    else {
      this.alertify.message(`Error occurred : ${result.error?.message}`, MessageTypes.Error, MessagePositions.TopRight, 10);
      return;
    }

    this.updateProductForm.get('productName')?.setValue(result.data.name);
    this.updateProductForm.get('productPrice')?.setValue(result.data.price);
    this.updateProductForm.get('productStock')?.setValue(result.data.stock);
  }
}
