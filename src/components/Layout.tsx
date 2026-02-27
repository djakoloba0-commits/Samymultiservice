import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Layout() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">SAMY MULTISERVICE</span>
              </Link>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <Link to="/catalog" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                  Catalogue
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                  À propos
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Link to="/profile" className="text-gray-500 hover:text-gray-700 p-2">
                <User className="h-6 w-6" />
              </Link>
              <Link to="/cart" className="text-gray-500 hover:text-gray-700 p-2 relative">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button className="md:hidden text-gray-500 hover:text-gray-700 p-2">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SAMY MULTISERVICE</h3>
              <p className="text-gray-400 text-sm">
                Votre partenaire pour toutes vos créations graphiques professionnelles.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens utiles</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/catalog" className="hover:text-white">Catalogue</Link></li>
                <li><Link to="/about" className="hover:text-white">À propos</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/admin" className="hover:text-white">Espace Admin</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Service Client</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link to="/shipping" className="hover:text-white">Livraison</Link></li>
                <li><Link to="/returns" className="hover:text-white">Retours</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-2">Abonnez-vous pour recevoir nos offres.</p>
              <div className="flex">
                <input type="email" placeholder="Votre email" className="px-3 py-2 bg-gray-800 text-white rounded-l-md w-full focus:outline-none" />
                <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md">
                  OK
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SAMY MULTISERVICE. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
