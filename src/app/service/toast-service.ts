import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ToastService {
  public isToastVisible = false;
  public toast = new Toast('', ToastType.NORMAL, 0);
  private currentToastTimeout?: number;

  setToast(toast: Toast) {
    clearTimeout(this.currentToastTimeout);
    this.toast.load(toast);
    this.isToastVisible = true;
    this.currentToastTimeout = setTimeout(() => {
      this.isToastVisible = false;
    }, toast.timeout);
  }
}

export class Toast {
  // The toast message to show
  message: string;
  // The amount of time to show the time in milliseconds
  timeout: number;
  type: ToastType;

  constructor(message: string, type: ToastType, timeout?: number) {
    this.message = message;
    this.type = type;
    this.timeout = timeout || 2000;
  }

  load(toast: Toast) {
    this.message = toast.message;
    this.timeout = toast.timeout;
    this.type = toast.type;
  }
}

export enum ToastType {
  NORMAL = 'normal', ERROR = 'error'
}
