import {TestBed} from '@angular/core/testing';

import {ProfileService} from './profile.service';
import {LoadingService} from '../../@core/loading/loading.service';
import {anyString, anything, capture, instance, mock, reset, verify, when} from 'ts-mockito';
import {HttpClient} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {Profile} from './profile';

describe('ProfileService', () => {
  let service: ProfileService;
  const mockedLoadingService = mock(LoadingService);
  const mockHttpClient = mock(HttpClient);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoadingService,
          useValue: instance(mockedLoadingService)
        },
        {
          provide: HttpClient,
          useValue: instance(mockHttpClient)
        }
      ]
    });
    service = TestBed.inject(ProfileService);
  });
  afterEach(() => {
    reset(mockedLoadingService);
    reset(mockHttpClient);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get profile name success', async () => {
    when(mockHttpClient.get(anything())).thenReturn(of({
      age: 1,
      userName: 'userName',
      email: 'email',
      lastName: 'lastName',
      firstName: 'firstName'
    } as Profile));
    const user = await service.getProfileUser();
    verify(mockedLoadingService.loading(anyString())).once();
    verify(mockedLoadingService.end(anyString())).once();
    const [startLoader] = capture(mockedLoadingService.loading).first();
    const [endLoader] = capture(mockedLoadingService.loading).first();
    expect(startLoader).toBe('get.profile');
    expect(endLoader).toBe('get.profile');
    expect(user).toBeDefined();
    expect(user.age).toBe(1);
    expect(user.userName).toBe('userName');
    expect(user.email).toBe('email');
    expect(user.firstName).toBe('firstName');
    expect(user.lastName).toBe('lastName');
  });
  it('should get profile name error', async () => {
    when(mockHttpClient.get(anything())).thenReturn(throwError({
      error: 'error'
    }));
    await expectAsync(service.getProfileUser()).toBeRejectedWith({
      error: 'error'
    });

    verify(mockedLoadingService.loading(anyString())).once();
    verify(mockedLoadingService.end(anyString())).once();
    const [startLoader] = capture(mockedLoadingService.loading).first();
    const [endLoader] = capture(mockedLoadingService.loading).first();
    expect(startLoader).toBe('get.profile');
    expect(endLoader).toBe('get.profile');
    expect(service.user).not.toBeDefined();
  });
  it('should set profile name success', async () => {
    when(mockHttpClient.put(anything(), anything())).thenReturn(of({
      age: 1,
      userName: 'userName',
      email: 'email',
      lastName: 'lastName',
      firstName: 'firstName'
    } as Profile));
    service.user = {
      age: 1,
      userName: 'userName',
      email: 'email',
      lastName: 'lastName',
      firstName: 'firstName'
    };
    await service.setName('test', 'test');
    verify(mockedLoadingService.loading(anyString())).once();
    verify(mockedLoadingService.end(anyString())).once();
    const [startLoader] = capture(mockedLoadingService.loading).first();
    const [endLoader] = capture(mockedLoadingService.loading).first();
    const {user} = service;
    expect(startLoader).toBe('set.profile');
    expect(endLoader).toBe('set.profile');
    expect(user).toBeDefined();
    expect(user.age).toBe(1);
    expect(user.userName).toBe('userName');
    expect(user.email).toBe('test.test@blueface.com');
    expect(user.firstName).toBe('test');
    expect(user.lastName).toBe('test');
  });
  it('should set profile name error', async () => {
    when(mockHttpClient.put(anything(), anything())).thenReturn(throwError({
      error: 'error'
    }));
    service.user = {
      age: 1,
      userName: 'userName',
      email: 'email',
      lastName: 'lastName',
      firstName: 'firstName'
    };
    await expectAsync(service.setName('test', 'test')).toBeRejectedWith({
      error: 'error'
    });
    verify(mockedLoadingService.loading(anyString())).once();
    verify(mockedLoadingService.end(anyString())).once();
    const [startLoader] = capture(mockedLoadingService.loading).first();
    const [endLoader] = capture(mockedLoadingService.loading).first();
    const {user} = service
    expect(startLoader).toBe('set.profile');
    expect(endLoader).toBe('set.profile');
    expect(user.firstName).toBe('firstName');
    expect(user.lastName).toBe('lastName');
  });
});
