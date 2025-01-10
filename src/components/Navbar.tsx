import { Link } from 'react-router-dom';
import { LogOut, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">FoodDash</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/orders"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Orders
            </Link>
            <button
              onClick={() => logout()}
              className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
            <div className="flex items-center space-x-2 text-sm">
              <ShoppingBag className="h-5 w-5 text-orange-500" />
              <span className="font-medium">{user?.username}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}