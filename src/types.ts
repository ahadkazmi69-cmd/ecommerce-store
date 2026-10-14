import { Product } from './data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export type CategoryFilter = 'all' | 'laptop' | 'phone' | 'handfree';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'card' | 'cod';
  cardNumber?: string;
  cardExp?: string;
  cardCvc?: string;
}

export interface ConfirmedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: string;
  paymentMethod: string;
  estimatedDelivery: string;
}
