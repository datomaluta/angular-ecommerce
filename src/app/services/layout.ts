import { effect, inject, Injectable, signal } from '@angular/core';
import { ScreenService } from './screen';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private screen = inject(ScreenService);
  private router = inject(Router);

  // mobile / desktop
  isMobile = this.screen.isMobile;

  // sidenav state
  opened = signal(!this.isMobile());

  constructor() {
    effect(() => {
      if (this.isMobile()) {
        this.opened.set(false);
      } else {
        this.opened.set(true);
      }
    });

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      if (this.isMobile()) {
        this.close();
      }
    });
  }

  toggle() {
    this.opened.update((v) => !v);
  }

  open() {
    this.opened.set(true);
  }

  close() {
    this.opened.set(false);
  }
}
