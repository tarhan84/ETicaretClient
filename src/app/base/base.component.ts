import { Component , OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) { }

  showSpinnerWithDuration(spinnerType : SpinnerTypes, duration : number) {
    this.spinner.show(spinnerType);
      setTimeout(() => {
        this.spinner.hide(spinnerType);
      }, duration*1000)
  }

  showSpinner(spinnerType : SpinnerTypes) {
    this.spinner.show(spinnerType);
  }

  hideSpinner(spinnerType : SpinnerTypes){
    this.spinner.hide(spinnerType)
  }
}

export enum SpinnerTypes{
  BallNewtonCradle = "ball-newton-cradle",
  Pacman = "pacman",
  Timer = "timer",
  BallElasticDots = "ball-elastic-dots"
}
