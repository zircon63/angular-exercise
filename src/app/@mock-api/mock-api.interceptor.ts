import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {MOCK_CONFIG, MockConfig, MockHttpHandler} from './mock.config.types';
import {catchError} from 'rxjs/operators';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {

  constructor(@Inject(MOCK_CONFIG) private readonly mockConfig: MockConfig) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const handler = this.resolveHandler(request);

    return handler ? handler().pipe(
      catchError(err => {
        return throwError(err.error);
      })
    ) : next.handle(request);
  }

  private resolveHandler(request: HttpRequest<unknown>): MockHttpHandler | undefined {
    if (this.mockConfig[request.method]) {
      if (this.mockConfig[request.method][request.url]) {
        return this.mockConfig[request.method][request.url];
      }
    }
  }
}
