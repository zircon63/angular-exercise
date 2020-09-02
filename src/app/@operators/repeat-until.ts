import {MonoTypeOperatorFunction} from 'rxjs';
import {retryWhen, takeWhile} from 'rxjs/operators';

export function repeatUntil<T>(predicate: (e: any) => boolean): MonoTypeOperatorFunction<T> {
  return source => {
    return source.pipe(
      retryWhen(errors => {
        return errors.pipe(
          takeWhile(predicate)
        );
      }),
    );
  };
}
