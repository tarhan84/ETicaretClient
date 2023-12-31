import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';


@NgModule({
  declarations: [
    ProductComponent,
    CreateComponent,
    ListComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path : "", component : ProductComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ]
})
export class ProductModule { }
