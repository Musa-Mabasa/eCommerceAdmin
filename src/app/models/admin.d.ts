export interface Product {
  id: string;
  adminId: string;
  name: string;
  desc: string;
  price: number;
  currency: string;
  category: string;
  quantity: number;
  tags: Tag[];
}

export interface Cart {
  id: string;
  adminId: string;
  products: Product[];
  totalCost: number;
}

export interface Tag {
  id: string;
  name: string;
  productId;
}
