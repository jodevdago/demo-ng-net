import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { CustomTitleStrategy } from './custom-title-stategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy,
    }
  ],
};
