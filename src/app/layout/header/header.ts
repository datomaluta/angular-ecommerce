import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';
import { LayoutService } from '../../services/layout';
// import { MatIcon } from '@angular/material/;

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions],
  template: `
    <mat-toolbar class="w-full elevated py-2 z-10">
      <button (click)="toggleSidebar()">Burger</button>
      <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <span>Mordern Store</span> <app-header-actions />
      </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {
  layout = inject(LayoutService);

  toggleSidebar() {
    this.layout.toggle();
  }
}
