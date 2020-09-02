import {NgOnDestroy} from './ng-on-destroy.service';

describe('NgOnDestroy', () => {
  let ngOnDestroy: NgOnDestroy;
  beforeEach(() => {
    ngOnDestroy = new NgOnDestroy();
  });
  it('should be created', () => {
    expect(ngOnDestroy).toBeTruthy();
  });
  it('should completed on hook ngOnDestroy', () => {
    const handler = jasmine.createSpyObj('handler', ['next', 'error', 'complete']);
    ngOnDestroy.ngOnDestroy();

    ngOnDestroy.subscribe({next: handler.next, complete: handler.complete, error: handler.error});
    expect(handler.complete).toHaveBeenCalled();
    expect(handler.error).not.toHaveBeenCalled();
    expect(handler.next).not.toHaveBeenCalled();
  });
});
