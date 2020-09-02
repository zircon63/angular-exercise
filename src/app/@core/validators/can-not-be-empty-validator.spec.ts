import {FormControl} from '@angular/forms';
import {canNotBeEmpty} from './can-not-be-empty.validator';

describe('CanNotBeEmpty', () => {
  it('should valid with null', () => {
    const result = canNotBeEmpty(new FormControl(null));
    expect(result).toBe(null);
  });
  it('should valid without whitespaces', () => {
    const result = canNotBeEmpty(new FormControl('hello world'));
    expect(result).toBe(null);
  });
  it('should valid with whitespaces', () => {
    const result = canNotBeEmpty(new FormControl('         hello world            '));
    expect(result).toBe(null);
  });
  it('should invalid only whitespaces', () => {
    const result = canNotBeEmpty(new FormControl('                      '));
    expect(result).toBeDefined();
    expect(result.empty).toBe('error.empty-string');
  });
});
