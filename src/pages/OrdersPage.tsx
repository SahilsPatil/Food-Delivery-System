import { useState } from 'react';
import type { Order } from '../types';
import { formatPrice } from '../lib/utils';

// Temporary mock data
const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      {
        id: '1',
        name: 'Margherita Pizza',
        category: 'Main Course',
        price: 12.99,
        availability: true,
        quantity: 2,
      },
    ],
    totalAmount: 25.98,
    status: 'completed',
    createdAt: '2024-02-28T12:00:00Z',
  },
  // Add more orders as needed
];

export function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">
                        x{item.quantity}
                      </span>
                    </div>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}