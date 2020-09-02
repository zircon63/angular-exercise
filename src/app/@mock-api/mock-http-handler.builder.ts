import {MockHttpHandler} from './mock.config.types';
import {Observable} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

export class MockHttpHandlerBuilder {
  private error: ConstructorParameters<typeof HttpErrorResponse>[0];
  private result: ConstructorParameters<typeof HttpResponse>[0];
  private timeout = 2000;

  static create(): MockHttpHandlerBuilder {
    return new this();
  }

  withTimeout(value: number): this {
    this.timeout = value;
    return this;
  }

  withResult(result: ConstructorParameters<typeof HttpResponse>[0]): this {
    this.result = result;
    return this;
  }

  withError(error: ConstructorParameters<typeof HttpErrorResponse>[0]): this {
    this.error = error;
    return this;
  }

  build(): MockHttpHandler {
    return () => new Observable((observer) => {
      setTimeout(() => {
        console.warn('simulate http request');
        if (Math.round(Math.random())) {
          const response = new HttpResponse(this.result);
          observer.next(response);
          observer.complete();
        } else {
          const error = new HttpErrorResponse(this.error);
          observer.error(error);
        }
      }, Math.random() * this.timeout);
    });
  }
}
