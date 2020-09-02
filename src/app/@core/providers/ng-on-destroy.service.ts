import {Subject} from 'rxjs';
import {Injectable, OnDestroy} from '@angular/core';

@Injectable()
export class NgOnDestroy extends Subject<null> implements OnDestroy {
  ngOnDestroy(): void {
    this.next(null);
    this.complete();
  }
}
