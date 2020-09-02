import {TestBed} from '@angular/core/testing';

import {MockApiInterceptor} from './mock-api.interceptor';
import {MOCK_CONFIG, MockConfig} from './mock.config.types';
import {of} from 'rxjs';
import {HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {anything, instance, mock, verify, when} from 'ts-mockito';
import {take} from 'rxjs/operators';


describe('MockApiInterceptor', () => {
  let interceptor: MockApiInterceptor;
  beforeEach(() => {
    const mockConfig: MockConfig = {
      GET: {
        'https://test.com/test': () => of(new HttpResponse({
          body: 'test'
        }))
      }
    };
    TestBed.configureTestingModule({
      providers: [
        MockApiInterceptor,
        {
          provide: MOCK_CONFIG,
          useValue: mockConfig
        }
      ]
    });
    interceptor = TestBed.inject(MockApiInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept request from config', (done) => {
    spyOn(Math, 'random').and.returnValue(0.9);
    const mockHttpHandler = mock<HttpHandler>();
    const httpRequest = new HttpRequest('GET', 'https://test.com/test');
    const event$ = interceptor.intercept(httpRequest, instance(mockHttpHandler));
    event$
      .pipe(
        take(1)
      )
      .subscribe((event: any) => {
        verify(mockHttpHandler.handle(anything())).never();
        expect(event).toBeTruthy();
        expect(event).toBeInstanceOf(HttpResponse);
        expect(event.body).toBe('test');
        done();
      });
  });

  it('should skip request not from config', (done) => {
    const mockHttpHandler = mock<HttpHandler>();
    when(mockHttpHandler.handle).thenReturn(() => of(null));
    const httpRequest = new HttpRequest('GET', 'https://test.com/test2');
    const event$ = interceptor.intercept(httpRequest, instance(mockHttpHandler));
    verify(mockHttpHandler.handle).once();
    event$.pipe(
      take(1)
    ).subscribe(event => {
      expect(event).toBe(null);
      done();
    })
  });
});
