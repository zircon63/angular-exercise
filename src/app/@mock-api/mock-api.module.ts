import {ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MockApiInterceptor} from './mock-api.interceptor';
import {MOCK_CONFIG, MockConfig} from './mock.config.types';


@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiInterceptor,
      multi: true
    }
  ]
})
export class MockApiModule {
  static withMocks(config: MockConfig): ModuleWithProviders<any> {
    return {
      ngModule: MockApiModule,
      providers: [
        {
          provide: MOCK_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
