import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private readonly loaderService = inject(LoaderService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();

    return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
  }
}
