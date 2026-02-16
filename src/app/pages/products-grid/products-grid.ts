import { Component, computed, effect, inject, input, signal, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { SidebarService } from '../../services/sidebar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';
import { ScreenService } from '../../services/screen';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
    ToggleWishlistButton,
    AsyncPipe,
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav [mode]="screen.isMobile() ? 'over' : 'side'" [opened]="sidebar.isOpen()">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categories</h2>
          <mat-nav-list>
            @for (cat of categories(); track cat) {
              <mat-list-item
                [activated]="cat === category()"
                class="my-2"
                [routerLink]="['/products', cat]"
              >
                <span
                  matListItemTitle
                  class="font-medium"
                  [class]="cat === category() ? '!text-white' : ''"
                  >{{ cat | titlecase }}</span
                >
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="bg-gray-100 p-6 h-full">
          <h1 class="text-2xl font-bold text-gray-900 mb-1">{{ category() | titlecase }}</h1>
          <p class="text-base text-gray-600 mb-6">
            {{ store.filteredProducts().length }} products found
          </p>
          <div class="responsive-grid">
            @for (product of store.filteredProducts(); track product.id) {
              <app-product-card [product]="product">
                <app-toggle-wishlist-button
                  [product]="product"
                  class="!absolute z-10  top-3 right-3"
                  [style.view-transition-name]="'wishlist-button-' + product.id"
                />
              </app-product-card>
            }
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');

  store = inject(EcommerceStore);

  sidebar = inject(SidebarService);

  screen = inject(ScreenService);

  categories = signal<string[]>(['all', 'clothing', 'electronics', 'home', 'accessories']);

  // @ViewChild('sidenav') sidenav!: MatSidenav;

  // isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map((result) => result.matches),
  //   shareReplay(),
  // );

  constructor() {
    this.store.setCategory(this.category);
    this.store.setProductsListSeoTags(this.category);
  }
}
