import { Component } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(private httpClientService : HttpClientService){}

  ngOnInit(){
    this.httpClientService.get({
      controller : "product"
    }).subscribe(data => console.log(data));
  }
}
