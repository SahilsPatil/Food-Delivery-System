import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { MenuItem } from '../types';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../lib/utils';

// Temporary mock data
const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    category: 'Main Course',
    price: 12.99,
    availability: true,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Caesar Salad',
    category: 'Appetizers',
    price: 8.99,
    availability: true,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop',
  },
  // Add more items as needed
];

export function MenuPage() {
  const [menuItems] = useState<MenuItem[]>(mockMenuItems);
  const { addItem } = useCartStore();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu</h1>
        <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          <PlusCircle className="h-5 w-5" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <span className="font-medium">{formatPrice(item.price)}</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`text-sm ${
                    item.availability
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {item.availability ? 'Available' : 'Unavailable'}
                </span>
                <button
                  onClick={() => addItem(item)}
                  disabled={!item.availability}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}