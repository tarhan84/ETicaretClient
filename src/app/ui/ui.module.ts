import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsModule } from './components/baskets/baskets.module';
import { HomeModule } from './components/home/home.module';
import { ProductModule } from '../admin/components/products/product.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BasketsModule,
    HomeModule,
    ProductModule
  ]
})
export class UiModule { }
