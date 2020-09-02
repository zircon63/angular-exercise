import {Observable} from 'rxjs';
import {HttpEvent} from '@angular/common/http';
import {InjectionToken} from '@angular/core';

type Method = 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';
export type MockHttpHandler = () => Observable<HttpEvent<unknown>>;
type MockItem = Record<string, MockHttpHandler>;
export type MockConfig = Partial<Record<Method, MockItem>>;

export const MOCK_CONFIG = new InjectionToken('MOCK_CONFIG');

