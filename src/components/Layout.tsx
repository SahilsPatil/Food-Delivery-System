import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Cart } from './Cart';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <Outlet />
          </div>
          <div className="w-96">
            <Cart />
          </div>
        </div>
      </main>
    </div>
  );
}