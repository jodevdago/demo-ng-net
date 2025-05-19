import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();
  private requestsInProgress = 0;

  show(): void {
    this.requestsInProgress++;
    if (this.requestsInProgress === 1) {
      this.loading.next(true);
    }
  }

  hide(): void {
    if (this.requestsInProgress > 0) {
      this.requestsInProgress--;
    }
    if (this.requestsInProgress === 0) {
      this.loading.next(false);
    }
  }
}
