import { effect, inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private breakpoint = inject(BreakpointObserver);

  isMobile = toSignal(
    this.breakpoint.observe('(max-width: 768px)').pipe(
      map((res) => res.matches),
      distinctUntilChanged(),
    ),
    { initialValue: false },
  );
}
