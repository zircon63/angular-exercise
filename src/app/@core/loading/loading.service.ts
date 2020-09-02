import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly subject = new BehaviorSubject(new Set<string>());
  private readonly loaders$ = this.subject.asObservable();

  private get loaders(): Set<string> {
    return this.subject.getValue();
  }

  loading(loader: string): void {
    this.loaders.add(loader);
    this.subject.next(this.loaders);
  }

  end(loader: string): void {
    this.loaders.delete(loader);
    this.subject.next(this.loaders);
  }

  isLoading$(loader: string): Observable<boolean> {
    return this.loaders$.pipe(
      map(loaders => loaders.has(loader))
    );
  }

  get anyLoading$(): Observable<boolean> {
    return this.loaders$.pipe(
      map(loaders => loaders.size > 0)
    );
  }
}
