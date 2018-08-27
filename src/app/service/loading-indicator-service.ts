import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadingIndicatorService {
  isLoading = false;
  loadingMessage = 'Loading...';

  startLoading(message?: string): void {
    this.isLoading = true;
    if (message) {
      this.loadingMessage = message;
    }
  }

  stopLoading(): void {
    this.isLoading = false;
    this.loadingMessage = 'Loading...';
  }
}
