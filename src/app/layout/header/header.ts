import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';
import { SidebarService } from '../../services/sidebar';
// import { MatIcon } from '@angular/material/;

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions],
  template: `
    <mat-toolbar class="w-full elevated py-2 z-10">
      <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <div class="flex gap-4">
          <button (click)="sidebar.toggle()" class="cursor-pointer">burger</button
          ><span>Mordern Store</span>
        </div>
        <app-header-actions />
      </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {
  sidebar = inject(SidebarService);
}
