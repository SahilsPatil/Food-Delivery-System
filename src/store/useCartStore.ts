import { create } from 'zustand';
import { orders } from '../lib/api';
import type { CartItem, MenuItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  total: number;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  total: 0,
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          total: state.total + item.price,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    });
  },
  removeItem: (itemId) => {
    set((state) => {
      const item = state.items.find((i) => i.id === itemId);
      if (!item) return state;
      return {
        items: state.items.filter((i) => i.id !== itemId),
        total: state.total - item.price * item.quantity,
      };
    });
  },
  updateQuantity: (itemId, quantity) => {
    set((state) => {
      const item = state.items.find((i) => i.id === itemId);
      if (!item) return state;
      const oldTotal = item.price * item.quantity;
      const newTotal = item.price * quantity;
      return {
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        ),
        total: state.total - oldTotal + newTotal,
      };
    });
  },
  clearCart: () => set({ items: [], total: 0 }),
  checkout: async () => {
    const { items, total } = get();
    await orders.create({ items, totalAmount: total });
    get().clearCart();
  },
}));