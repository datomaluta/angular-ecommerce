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
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from './models/user-review';
import { SeoManager } from './services/seo-manager';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;

  loading: boolean;
  selectedProductId: string | undefined;

  writeReview: boolean;
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
        rating: 4.8,
        reviewCount: 124,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userName: 'Luka Beridze',
            userImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
            title: 'Perfect ANC',
            comment: 'Metro noise completely gone.',
            reviewDate: new Date('2025-11-02'),
          },
          {
            id: 'r2',
            productId: '1',
            userName: 'Nini Kapanadze',
            userImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
            rating: 4,
            title: 'Comfortable',
            comment: 'Good for long work sessions.',
            reviewDate: new Date('2025-12-18'),
          },
        ],
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
        reviews: [
          {
            id: 'r3',
            productId: '2',
            userName: 'Giorgi Lomidze',
            userImageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
            rating: 4,
            title: 'Accurate tracking',
            comment: 'Steps & sleep seem correct.',
            reviewDate: new Date('2025-09-12'),
          },
          {
            id: 'r4',
            productId: '2',
            userName: 'Ana Japaridze',
            userImageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
            rating: 5,
            title: 'Love it',
            comment: 'Battery lasts 4 days.',
            reviewDate: new Date('2025-10-01'),
          },
        ],
      },

      {
        id: '3',
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with deep bass and waterproof design.',
        price: 89.99,
        imageUrl:
          'https://img4.dhresource.com/webp/m/0x0/f3/albu/km/o/25/4ddcc665-02a0-42d8-97e7-659abab8e624.jpg',
        rating: 3.4,
        reviewCount: 76,
        inStock: false,
        category: 'electronics',
        reviews: [
          {
            id: 'r5',
            productId: '3',
            userName: 'Dato Mchedlishvili',
            userImageUrl: 'https://randomuser.me/api/portraits/men/76.jpg',
            rating: 3,
            title: 'Okay bass',
            comment: 'Not super loud outdoors.',
            reviewDate: new Date('2025-06-11'),
          },
          {
            id: 'r6',
            productId: '3',
            userName: 'Mariam Shengelia',
            userImageUrl: 'https://randomuser.me/api/portraits/women/52.jpg',
            rating: 4,
            title: 'Good value',
            comment: 'Great for picnics.',
            reviewDate: new Date('2025-07-02'),
          },
        ],
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
        reviews: [
          {
            id: 'r7',
            productId: '4',
            userName: 'Tornike Gogoladze',
            userImageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
            rating: 5,
            title: 'Saved my neck',
            comment: 'Posture improved.',
            reviewDate: new Date('2025-04-22'),
          },
          {
            id: 'r8',
            productId: '4',
            userName: 'Salome Kordzaia',
            userImageUrl: 'https://randomuser.me/api/portraits/women/63.jpg',
            rating: 4,
            title: 'Stable',
            comment: 'Does not shake.',
            reviewDate: new Date('2025-05-01'),
          },
        ],
      },

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
        reviews: [
          {
            id: 'r9',
            productId: '5',
            userName: 'Irakli Nemsadze',
            userImageUrl: 'https://randomuser.me/api/portraits/men/18.jpg',
            rating: 4,
            title: 'Soft fabric',
            comment: 'Nice daily shirt.',
            reviewDate: new Date('2025-03-02'),
          },
          {
            id: 'r10',
            productId: '5',
            userName: 'Keti Maisuradze',
            userImageUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
            rating: 5,
            title: 'Perfect fit',
            comment: 'True to size.',
            reviewDate: new Date('2025-03-15'),
          },
        ],
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
        reviews: [
          {
            id: 'r11',
            productId: '6',
            userName: 'Levan Bakuradze',
            userImageUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
            rating: 5,
            title: 'Stylish',
            comment: 'Looks premium.',
            reviewDate: new Date('2025-02-02'),
          },
          {
            id: 'r12',
            productId: '6',
            userName: 'Natia Khutsishvili',
            userImageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
            rating: 4,
            title: 'Warm enough',
            comment: 'Good for spring.',
            reviewDate: new Date('2025-02-20'),
          },
        ],
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
        reviews: [
          {
            id: 'r13',
            productId: '7',
            userName: 'Saba Kvaratskhelia',
            userImageUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
            rating: 4,
            title: 'Very warm',
            comment: 'Great for winter.',
            reviewDate: new Date('2025-01-10'),
          },
          {
            id: 'r14',
            productId: '7',
            userName: 'Mako Gelashvili',
            userImageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
            rating: 5,
            title: 'Super comfy',
            comment: 'Favorite hoodie.',
            reviewDate: new Date('2025-01-18'),
          },
        ],
      },

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
        reviews: [
          {
            id: 'r15',
            productId: '10',
            userName: 'Beka Nadiradze',
            userImageUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
            rating: 4,
            title: 'Nice look',
            comment: 'Stylish frame.',
            reviewDate: new Date('2025-06-03'),
          },
          {
            id: 'r16',
            productId: '10',
            userName: 'Tatia Tsertsvadze',
            userImageUrl: 'https://randomuser.me/api/portraits/women/67.jpg',
            rating: 5,
            title: 'Great driving',
            comment: 'No glare.',
            reviewDate: new Date('2025-06-07'),
          },
        ],
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
        reviews: [
          {
            id: 'r17',
            productId: '11',
            userName: 'Zura Tsiklauri',
            userImageUrl: 'https://randomuser.me/api/portraits/men/90.jpg',
            rating: 5,
            title: 'Travel friendly',
            comment: 'Fits laptop.',
            reviewDate: new Date('2025-04-04'),
          },
          {
            id: 'r18',
            productId: '11',
            userName: 'Elene Pruidze',
            userImageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
            rating: 4,
            title: 'Many pockets',
            comment: 'Very practical.',
            reviewDate: new Date('2025-04-10'),
          },
        ],
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
        reviews: [
          {
            id: 'r19',
            productId: '12',
            userName: 'Nodar Kiknadze',
            userImageUrl: 'https://randomuser.me/api/portraits/men/53.jpg',
            rating: 4,
            title: 'Elegant',
            comment: 'Looks classy.',
            reviewDate: new Date('2025-08-01'),
          },
          {
            id: 'r20',
            productId: '12',
            userName: 'Lizi Chikhradze',
            userImageUrl: 'https://randomuser.me/api/portraits/women/73.jpg',
            rating: 5,
            title: 'Love strap',
            comment: 'Comfortable leather.',
            reviewDate: new Date('2025-08-12'),
          },
        ],
      },

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
        reviews: [
          {
            id: 'r21',
            productId: '13',
            userName: 'Temo Gaprindashvili',
            userImageUrl: 'https://randomuser.me/api/portraits/men/77.jpg',
            rating: 5,
            title: 'Cozy light',
            comment: 'Perfect for bedroom.',
            reviewDate: new Date('2025-05-02'),
          },
          {
            id: 'r22',
            productId: '13',
            userName: 'Nana Jibladze',
            userImageUrl: 'https://randomuser.me/api/portraits/women/61.jpg',
            rating: 4,
            title: 'Nice ambiance',
            comment: 'Warm color.',
            reviewDate: new Date('2025-05-05'),
          },
        ],
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
        reviews: [
          {
            id: 'r23',
            productId: '14',
            userName: 'Bacho Megrelishvili',
            userImageUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
            rating: 4,
            title: 'Good mug',
            comment: 'Keeps heat well.',
            reviewDate: new Date('2025-03-11'),
          },
          {
            id: 'r24',
            productId: '14',
            userName: 'Sopo Tsikarishvili',
            userImageUrl: 'https://randomuser.me/api/portraits/women/38.jpg',
            rating: 5,
            title: 'Cute design',
            comment: 'Daily coffee mug.',
            reviewDate: new Date('2025-03-15'),
          },
        ],
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
        reviews: [
          {
            id: 'r25',
            productId: '15',
            userName: 'Giga Turmanidze',
            userImageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
            rating: 4,
            title: 'Soft',
            comment: 'Comfortable pillow.',
            reviewDate: new Date('2025-02-05'),
          },
          {
            id: 'r26',
            productId: '15',
            userName: 'Maya Khachidze',
            userImageUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
            rating: 5,
            title: 'Nice decor',
            comment: 'Matches sofa.',
            reviewDate: new Date('2025-02-14'),
          },
        ],
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
  }),
  // withStorageSync({
  //   key: 'modern-store',
  //   select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  // }),
  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
    selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
  })),
  withMethods(
    (
      store,
      toaster = inject(Toaster),
      matDialog = inject(MatDialog),
      router = inject(Router),
      seoManager = inject(SeoManager),
    ) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),
      setProductsListSeoTags: signalMethod<string | undefined>((category) => {
        const categoryName = category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : 'All Products';
        const description = category
          ? `Browse our collection of ${category} products`
          : 'Browse our collection of products';

        seoManager.updateSeoTags({
          title: categoryName,
          description,
        });
      }),
      setProductId: signalMethod<string>((productId) => {
        patchState(store, { selectedProductId: productId });
      }),
      setProductSeoTags: signalMethod<Product | undefined>((product) => {
        if (!product) return;
        seoManager.updateSeoTags({
          title: product.name,
          description: product.description,
          image: product.imageUrl,
          type: 'product',
        });
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

      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
        } else {
          router.navigate(['/checkout']);
        }
      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: 1,
            name: 'John Doe',
            email,
            password,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: 1,
            name,
            email,
            password,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
      },

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();
        if (!user) {
          toaster.error('Please login before placing order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id.toString(),
          total: Math.round(
            store?.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0),
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['order-success']);
      },

      showWriteReview: () => {
        patchState(store, { writeReview: true });
      },

      hideWriteReview: () => {
        patchState(store, { writeReview: false });
      },

      addReview: async ({ title, comment, rating }: AddReviewParams) => {
        patchState(store, { loading: true });
        const product = store.products().find((p) => p.id === store.selectedProductId());

        if (!product) {
          patchState(store, { loading: false });
          return;
        }

        const review: UserReview = {
          id: crypto.randomUUID(),
          title,
          comment,
          rating,
          productId: product.id,
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.imageUrl || '',
          reviewDate: new Date(),
        };

        const updatedProducts = produce(store.products(), (draft) => {
          const index = draft.findIndex((p) => p.id == product.id);
          draft[index].reviews.push(review);
          draft[index].rating =
            Math.round(
              (draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) /
                draft[index].reviews.length) *
                10,
            ) / 10;
          draft[index].reviewCount = draft[index].reviews.length;
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, products: updatedProducts, writeReview: false });
      },
    }),
  ),
);
