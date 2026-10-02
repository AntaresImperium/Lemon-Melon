import { Product } from '../data/products';

export interface CartItem {
  id: string; // unique item id in cart
  productId: string;
  product: Product;
  quantity: number;
  customNote?: string;
  bundleItems?: Product[];
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  giftNote?: string;
  deliveryOption: 'express-cold' | 'standard' | 'pickup';
  paymentMethod: 'apple-pay' | 'card' | 'cod';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  placedAt: string;
}
