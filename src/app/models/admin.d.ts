export interface Product {
  id?: string;
  adminId: string;
  cartId?: string;
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
  cart?: Cart;
  products: CorrelatedProduct[];
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
