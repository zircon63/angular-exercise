import {MockHttpHandlerBuilder} from './mock-http-handler.builder';
import {noop} from 'rxjs';


describe('MockHttpHandlerBuilder', () => {
  let builder: MockHttpHandlerBuilder;
  beforeEach(() => {
    builder = new MockHttpHandlerBuilder();
  });

  it('should be created', () => {
    expect(builder).toBeTruthy();
  });
  it('should build with result', (done) => {
    spyOn(Math, 'random').and.returnValue(0.9);
    builder
      .withResult({
        body: 'test'
      });
    const handler = builder.build();
    handler().subscribe((response: any) => {
      expect(response).toBeTruthy();
      expect(response.body).toBe('test');
      done();
    });
  });
  it('should build with error', (done) => {
    spyOn(Math, 'random').and.returnValue(0.1);
    builder
      .withError({
        error: 'error'
      });
    const handler = builder.build();
    handler().subscribe(noop, response => {
      expect(response).toBeTruthy();
      expect(response.error).toBe('error');
      done();
    });
  });
});
