import { Injectable } from '@angular/core';
declare var alertify: any
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier','position', options.position);
    alertify.set('notifier','delay', options.delay);
    const msj= alertify[options.messageType](message)
    if (options.dismissOther) {
      msj.dismissOther();
    }
  }
}
export class AlertifyOptions {
  delay: number = 3;
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomRight;
  dismissOther: boolean = false
}

export enum MessageType {
  Error = "error",
  Success = "success",
  Notify = "notify",
  Message = "message",
  Warning = "warning"
}

export enum Position {
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}
