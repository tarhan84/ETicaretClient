import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from './products/product.module';
import { CustomerModule } from './customers/customer.module';
import { OrderModule } from './orders/order.module';
import { DashboardModule } from './dashboard/dashboard.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductModule,
    CustomerModule,
    OrderModule,
    DashboardModule
  ]
})
export class ComponentsModule { }
