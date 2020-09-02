import {LoadingService} from './loading.service';
import createSpyObj = jasmine.createSpyObj;

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    service = new LoadingService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have nothing loaders', (done) => {
    service.anyLoading$.subscribe(loading => {
      expect(loading).toBeFalse();
      done();
    });
  });

  it('should have loader: test', (done) => {
    service.loading('test');
    service.isLoading$('test').subscribe(loading => {
      expect(loading).toBeTruthy();
      done();
    });
  });
  it('should does not have loader: test', (done) => {
    service.isLoading$('test').subscribe(loading => {
      expect(loading).toBeFalse();
      done();
    });
  });

  it('should end loader: test', () => {
    const handler = createSpyObj('handler', ['next']);
    service.loading('test');
    service.isLoading$('test').subscribe(handler.next).unsubscribe();
    expect(handler.next).toHaveBeenCalledWith(true);
    service.end('test');
    service.isLoading$('test').subscribe(handler.next).unsubscribe();
    expect(handler.next).toHaveBeenCalledWith(false);
    expect(handler.next).toHaveBeenCalledTimes(2);
  });
});
