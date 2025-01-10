export interface User {
  id: string;
  username: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  availability: boolean;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}