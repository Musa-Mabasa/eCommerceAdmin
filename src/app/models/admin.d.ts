export interface Product {
  id?: string;
  adminId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  quantity: number;
  imageUrl?: string;
}

export interface Cart {
  id: string;
  userId: string;
}

export interface UserCart {
  id: string;
  cartId: string;
  productId: string;
  adminId: string;
}

export interface Tag {
  id: string;
  name: string;
  productId: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CorrelatedProduct {
  product: Product;
  tags: Tag[];
}

export interface CurrencyExhangeRates {
  meta: Meta;
  data: Data;
}
export interface Meta {
  last_updated_at: string;
}

export interface Data {
  EUR: Currency;
  GBP: Currency;
  USD: Currency;
  ZAR: Currency;
}

export interface Currency {
  code: string;
  value: number;
}

export interface OrderItem {
  id: string;
  adminId: string;
  customerAvatar: string;
  customerName: string;
  date: string;
  day: string;
  productId: string;
}

export interface CorrelatedOrderItem {
  orderItem: OrderItem;
  productName: string;
  productPrice: number;
  productCurrency: string;
}
