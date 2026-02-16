import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryApi {
  private categories = ['all', 'electronics', 'clothing', 'accessories', 'home'];

  getCategories() {
    return this.categories;
  }
}
