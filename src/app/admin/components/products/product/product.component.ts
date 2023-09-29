import { Component } from '@angular/core';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(private httpClientService : HttpClientService){}

  ngOnInit(){
    //this.httpClientService.delete({controller: "product"}, "2956b1ce-6627-441d-ac02-f680df8d3f0b").subscribe(data => console.log(data));
    //this.httpClientService.get({fullEndpoint: "https://jsonplaceholder.typicode.com/comments"}).subscribe(data => console.log(data));
    //this.httpClientService.get<Product[]>({controller: "product"}).subscribe(data => console.log(data));
    //var product: Product = {name: "test", price: 4, stock: 5};
    //this.httpClientService.post({controller: "product"}, product).subscribe(data => console.log(data));
  }
}
