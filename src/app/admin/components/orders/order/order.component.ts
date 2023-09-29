import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends BaseComponent{
  constructor (spinner : NgxSpinnerService) {
    super(spinner)
  }

  ngOnInit() : void{
    //this.showSpinnerWithDuration(SpinnerTypes.Timer, 5)
  }
}
