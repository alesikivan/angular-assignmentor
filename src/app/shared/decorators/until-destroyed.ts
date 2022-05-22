import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


const subjectSymbol: symbol = Symbol('__destroy');
const method: string = 'ngOnDestroy';

export type TUntilDestroyed = <T>() => (source: Observable<T>) => Observable<T>;

export function UntilDestroyed() {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (target: any, key: string) => {
    Object.defineProperty(target, key, {
      configurable: false,
      get(): any {
        return () => getOperator(this);
      },
    });

    const originalMethod: any = target[method];
    target[method] = function (args: any) {
      if (originalMethod) {
        originalMethod.apply(this, args);
      }

      completeSubject(this);
    };
  };
}

function createSubject(target: any): void {
  if (!target[subjectSymbol]) {
    target[subjectSymbol] = new Subject<void>();
  }
}

function completeSubject(target: any): void {
  if (target[subjectSymbol]) {
    target[subjectSymbol].next();
    target[subjectSymbol].complete();
    delete target[subjectSymbol];
  }
}

function getOperator(target: any): (source: Observable<any>) => Observable<any> {
  return (source: Observable<any>) => {
    createSubject(target);

    return source.pipe(takeUntil(target[subjectSymbol]));
  };
}
