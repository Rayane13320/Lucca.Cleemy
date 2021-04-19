import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

export function mapToVoid() {
  return function <T>(source: Observable<T>): Observable<void> {
    return source.pipe(switchMap(() => of(void 0)));
  };
}
