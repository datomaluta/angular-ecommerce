import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { CartItem } from './models/cart';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState<EcommerceState>({
    products: [
      {
        id: '1',
        name: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear wireless headphones with long battery life.',
        price: 199.99,
        imageUrl: 'https://i.ebayimg.com/images/g/3LcAAOSwouRjeQkK/s-l1200.jpg',
        rating: 4.6,
        reviewCount: 124,
        inStock: true,
        category: 'electronics',
      },
      {
        id: '2',
        name: 'Smart Watch',
        description: 'Fitness tracking smart watch with heart rate and sleep monitoring.',
        price: 149.5,
        imageUrl:
          'https://ee.ge/_next/image?url=https%3A%2F%2Fstatic.ee.ge%2FElite%2F210a549b-1b3f-4ba5-95f7-91c49edd7a4e_Thumb.jpeg&w=1640&q=75',
        rating: 4.3,
        reviewCount: 98,
        inStock: true,
        category: 'electronics',
      },
      {
        id: '3',
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with deep bass and waterproof design.',
        price: 89.99,
        imageUrl:
          'https://img4.dhresource.com/webp/m/0x0/f3/albu/km/o/25/4ddcc665-02a0-42d8-97e7-659abab8e624.jpg',
        rating: 4.4,
        reviewCount: 76,
        inStock: false,
        category: 'electronics',
      },
      {
        id: '4',
        name: 'Laptop Stand',
        description: 'Ergonomic aluminum laptop stand for better posture.',
        price: 49.99,
        imageUrl: 'https://enkelstudios.com/cdn/shop/products/IMG_5234_1024x1024.jpg?v=1634569961',
        rating: 4.5,
        reviewCount: 63,
        inStock: true,
        category: 'electronics',
      },

      // CLOTHING
      {
        id: '5',
        name: 'Cotton T-Shirt',
        description: 'Soft and breathable cotton t-shirt for everyday wear.',
        price: 24.99,
        imageUrl:
          'https://i.etsystatic.com/56925105/r/il/efb09f/6992815207/il_570xN.6992815207_h9mn.jpg',
        rating: 4.1,
        reviewCount: 56,
        inStock: true,
        category: 'clothing',
      },
      {
        id: '6',
        name: 'Denim Jacket',
        description: 'Classic denim jacket with a modern fit.',
        price: 89.0,
        imageUrl:
          'https://boogzelclothing.com/cdn/shop/files/Faux-Sherpa-Lined-Denim-Jacket-Boogzel-Clothing-3_800x.jpg?v=1693111491',
        rating: 4.7,
        reviewCount: 203,
        inStock: true,
        category: 'clothing',
      },
      {
        id: '7',
        name: 'Hoodie',
        description: 'Warm and comfortable hoodie made from premium fabric.',
        price: 59.99,
        imageUrl:
          'https://i.etsystatic.com/32784376/r/il/05c48a/3870562497/il_fullxfull.3870562497_3dnx.jpg',
        rating: 4.4,
        reviewCount: 91,
        inStock: false,
        category: 'clothing',
      },
      // {
      //   id: '8',
      //   name: 'Running Shoes',
      //   description: 'Lightweight running shoes designed for everyday training.',
      //   price: 129.99,
      //   imageUrl: 'https://source.unsplash.com/600x600/?running,shoes',
      //   rating: 4.6,
      //   reviewCount: 147,
      //   inStock: true,
      //   category: 'clothing',
      // },

      // ACCESSORIES
      // {
      //   id: '9',
      //   name: 'Leather Wallet',
      //   description: 'Genuine leather wallet with multiple card slots.',
      //   price: 39.99,
      //   imageUrl: 'https://source.unsplash.com/600x600/?leather,wallet',
      //   rating: 4.4,
      //   reviewCount: 71,
      //   inStock: true,
      //   category: 'accessories',
      // },
      {
        id: '10',
        name: 'Sunglasses',
        description: 'UV-protected stylish sunglasses for everyday use.',
        price: 29.99,
        imageUrl:
          'https://sunski.com/cdn/shop/products/sunski_polarized_sunglasses_ventana_15.jpg?crop=center&height=1100&v=1709151131&width=1400',
        rating: 4.0,
        reviewCount: 44,
        inStock: true,
        category: 'accessories',
      },
      {
        id: '11',
        name: 'Backpack',
        description: 'Durable backpack suitable for travel and daily use.',
        price: 69.99,
        imageUrl:
          'https://images-cdn.ubuy.co.in/6427e23846b2d17b9e204894-aesthetic-backpack-with-purse-and.jpg',
        rating: 4.5,
        reviewCount: 119,
        inStock: false,
        category: 'accessories',
      },
      {
        id: '12',
        name: 'Wrist Watch',
        description: 'Minimalist analog wrist watch with leather strap.',
        price: 119.99,
        imageUrl:
          'https://cdn.webshopapp.com/shops/277113/files/435665544/800x800x1/classic-40mm-mariner.jpg',
        rating: 4.3,
        reviewCount: 88,
        inStock: true,
        category: 'accessories',
      },

      // HOME
      {
        id: '13',
        name: 'Table Lamp',
        description: 'Minimalist table lamp with warm ambient lighting.',
        price: 59.99,
        imageUrl:
          'https://torontolife.mblycdn.com/tl/resized/2023/08/w1280/001-Luminaire-Authentik-Copy-of-SOPAL-1205-de-table_FULL-scaled-e1691085549664.jpg',
        rating: 4.5,
        reviewCount: 89,
        inStock: true,
        category: 'home',
      },
      {
        id: '14',
        name: 'Ceramic Coffee Mug',
        description: 'Durable ceramic mug perfect for coffee or tea.',
        price: 14.99,
        imageUrl:
          'https://roomtery.com/cdn/shop/files/fresh-coconut-ceramic-mug_6.jpg?v=1729917123&width=1946',
        rating: 4.2,
        reviewCount: 112,
        inStock: true,
        category: 'home',
      },
      {
        id: '15',
        name: 'Throw Pillow',
        description: 'Decorative throw pillow to enhance your living space.',
        price: 34.99,
        imageUrl:
          'https://d3dxkzk9npnkec.cloudfront.net/uploads/images/202404/img_x500_66143921cfd668-94063682-14497441.webp',
        rating: 4.1,
        reviewCount: 52,
        inStock: false,
        category: 'home',
      },
      // {
      //   id: '16',
      //   name: 'Wall Clock',
      //   description: 'Modern wall clock with silent movement.',
      //   price: 44.99,
      //   imageUrl: 'https://source.unsplash.com/600x600/?wall,clock,interior',
      //   rating: 4.6,
      //   reviewCount: 67,
      //   inStock: true,
      //   category: 'home',
      // },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
  }),
  withComputed(({ category, products, wishlistItems, cartItems }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),
  withMethods((store, toaster = inject(Toaster)) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category });
    }),
    addToWishlist: (product: Product) => {
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((p) => p.id === product.id)) {
          draft.push(product);
        }
      });

      patchState(store, { wishlistItems: updatedWishlistItems });
      toaster.success('Product added to wishlist');

      // if (store.wishlistItems().some((p) => p.id === product.id)) return;

      // patchState(store, {
      //   wishlistItems: [...store.wishlistItems(), product],
      // });

      // toaster.success('Product added to wishlist');
    },

    removeFromWishlist: (product: Product) => {
      patchState(store, {
        wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
      });
      toaster.success('Product removed from wishlist');
    },

    clearWishlist: () => {
      patchState(store, { wishlistItems: [] });
    },

    addToCart: (product: Product, quantity = 1) => {
      const existingItemIndex = store.cartItems().findIndex((p) => p.product.id === product.id);

      const updatedCartItems = produce(store.cartItems(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity += quantity;
          return;
        }

        draft.push({
          product,
          quantity,
        });
      });

      patchState(store, { cartItems: updatedCartItems });
      toaster.success(
        existingItemIndex !== -1 ? 'Product added again' : 'Product added to the cart',
      );
    },

    setItemQuantity: (params: { productId: string; quantity: number }) => {
      const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
      const updated = produce(store.cartItems(), (draft) => {
        draft[index].quantity = params.quantity;
      });

      patchState(store, { cartItems: updated });
    },

    addAllWishlistToCart: () => {
      const updatedCartItems = produce(store.cartItems(), (draft) => {
        store.wishlistItems().forEach((p) => {
          if (!draft.find((c) => c.product.id === p.id)) {
            draft.push({ product: p, quantity: 1 });
          }
        });
      });

      patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
    },

    moveToWishlist: (product: Product) => {
      const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((p) => p.id === product.id)) {
          draft.push(product);
        }
      });

      patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
    },

    removeFromCart: (product: Product) => {
      console.log('remove from cart');
      const updatedCartItems = store.cartItems().filter((c) => c.product.id !== product.id);
      patchState(store, { cartItems: updatedCartItems });
    },

    // setItemQuantity:
  })),
);
