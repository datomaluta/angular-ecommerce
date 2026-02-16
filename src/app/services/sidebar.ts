import { inject, Injectable, signal, effect } from '@angular/core';
import { ScreenService } from './screen';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  isOpen = signal(false); // SSR safe default

  constructor(private screen: ScreenService) {
    effect(() => {
      if (!this.screen.ready()) return;

      if (this.screen.isMobile()) {
        this.isOpen.set(false);
      } else {
        this.isOpen.set(true);
      }
    });
  }

  toggle() {
    this.isOpen.update((v) => !v);
  }

  close() {
    this.isOpen.set(false);
  }
}
