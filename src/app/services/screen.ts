import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScreenService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isMobile = signal(false);
  ready = signal(false); // hydration დასრულდა

  constructor() {
    if (!this.isBrowser) return;

    const media = window.matchMedia('(max-width: 768px)');

    this.isMobile.set(media.matches);
    this.ready.set(true);

    media.addEventListener('change', (e) => {
      this.isMobile.set(e.matches);
    });
  }
}
