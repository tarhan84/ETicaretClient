import { Injectable } from '@angular/core';

declare var alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string,
    messageType: MessageTypes = MessageTypes.Message,
    positions: MessagePositions = MessagePositions.TopRight,
    delay: number = 5) {
    alertify.set('notifier', 'position', positions);
    alertify.set('notifier', 'delay', delay);
    alertify[messageType](message);
  }
}

export enum MessageTypes {
  Error = "error",
  Message = "message",
  Notift = "notify",
  Success = "success",
  Warning = "warning"
}

export enum MessagePositions {
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center"
}
