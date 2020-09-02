import {ValidatorFn} from '@angular/forms';

export const canNotBeEmpty: ValidatorFn = (control) => {
  if (control.value) {
    return control.value.trim().length > 0 ? null : {empty: 'error.empty-string'};
  } else {
    return null;
  }
};
