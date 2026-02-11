export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id?: number;
  customerName?: string;
  items: OrderItem[];
  total?: number;
}
