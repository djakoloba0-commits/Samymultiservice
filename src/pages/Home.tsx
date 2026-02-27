import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { Product } from '../store/useCartStore';
import { useCartStore } from '../store/useCartStore';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch('/api/products?sort=price_desc')
      .then((res) => res.json())
      .then((data) => setFeaturedProducts(data.slice(0, 4)));
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://picsum.photos/seed/design/1920/1080"
            alt="Hero background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-75 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Donnez vie à vos idées.
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Création de logos, affiches web, maquettes professionnelles et bien plus. Votre identité visuelle par SAMY MULTISERVICE.
          </p>
          <div className="mt-10 max-w-sm sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <Link
                to="/catalog"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
              >
                Voir le catalogue
              </Link>
              <Link
                to="/promotions"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 sm:px-8"
              >
                Offres spéciales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Nos Services Populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Identité Visuelle', 'Web Design', 'Print', 'Illustration'].map((category) => (
            <Link
              key={category}
              to={`/catalog?category=${category}`}
              className="group relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={`https://picsum.photos/seed/${category.toLowerCase()}/400/300`}
                  alt={category}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-semibold text-white">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900">Services en Vedette</h2>
            <Link to="/catalog" className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center">
              Voir tout <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <Link to={`/product/${product.id}`} className="block relative h-48">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-bold text-gray-900 shadow">
                    {product.brand}
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating} ({product.reviews_count})</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-gray-900">{product.price.toFixed(2)} €</span>
                    <button
                      onClick={() => addItem(product)}
                      className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
                      aria-label="Ajouter au panier"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-12">Ce que disent nos clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Sophie L.', text: 'Mon logo est magnifique ! Service très professionnel et à l\'écoute.', rating: 5 },
            { name: 'Marc D.', text: 'Les affiches pour mon événement ont fait sensation. Je recommande à 100%.', rating: 5 },
            { name: 'Julie M.', text: 'Maquette web livrée dans les temps et parfaitement conforme à mes attentes.', rating: 4 },
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`h-5 w-5 ${j < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
              <p className="font-semibold text-gray-900">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
