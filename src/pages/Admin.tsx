import React, { useState } from 'react';
import { Package, Users, ShoppingCart, BarChart2, Plus, Edit, Trash2 } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-indigo-400">SAMY MULTISERVICE</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              activeTab === 'dashboard' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <BarChart2 className="mr-3 h-5 w-5" />
            Tableau de bord
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              activeTab === 'products' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Package className="mr-3 h-5 w-5" />
            Produits
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              activeTab === 'orders' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <ShoppingCart className="mr-3 h-5 w-5" />
            Commandes
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              activeTab === 'customers' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Users className="mr-3 h-5 w-5" />
            Clients
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Tableau de bord</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Chiffre d'affaires</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">24 500 €</p>
                <p className="mt-2 text-sm text-green-600">+12% ce mois</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Commandes</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">145</p>
                <p className="mt-2 text-sm text-green-600">+5% ce mois</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Nouveaux clients</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">32</p>
                <p className="mt-2 text-sm text-red-600">-2% ce mois</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Taux de conversion</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">3.2%</p>
                <p className="mt-2 text-sm text-green-600">+0.4% ce mois</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un produit
              </button>
            </div>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 1, name: 'Création de Logo', category: 'Identité Visuelle', price: 149.00, stock: 999 },
                    { id: 2, name: 'Affiche Web', category: 'Web Design', price: 49.00, stock: 999 },
                    { id: 3, name: 'Maquette Professionnelle', category: 'Web Design', price: 299.00, stock: 999 },
                  ].map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price.toFixed(2)} €</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 20 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3"><Edit className="h-4 w-4" /></button>
                        <button className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Commandes</h1>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Commande</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 'CMD-847591', customer: 'Jean Dupont', date: '2024-10-12', total: 1249.00, status: 'Livré' },
                    { id: 'CMD-847592', customer: 'Marie Laurent', date: '2024-10-14', total: 349.99, status: 'En cours' },
                    { id: 'CMD-847593', customer: 'Thomas Dubois', date: '2024-10-15', total: 3499.00, status: 'En préparation' },
                  ].map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total.toFixed(2)} €</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Livré' ? 'bg-green-100 text-green-800' : 
                          order.status === 'En cours' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">Gérer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
           <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Clients</h1>
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commandes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Dépensé</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com', orders: 5, total: 4500.00 },
                    { id: 2, name: 'Marie Laurent', email: 'marie.laurent@example.com', orders: 2, total: 850.00 },
                    { id: 3, name: 'Thomas Dubois', email: 'thomas.dubois@example.com', orders: 1, total: 3499.00 },
                  ].map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.orders}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.total.toFixed(2)} €</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Profil</button>
                        <button className="text-red-600 hover:text-red-900">Bloquer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
