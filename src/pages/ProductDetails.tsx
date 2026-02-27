import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Truck, ShieldCheck, ArrowLeft, Heart } from 'lucide-react';
import { Product, useCartStore } from '../store/useCartStore';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Produit introuvable</h2>
        <Link to="/catalog" className="text-indigo-600 hover:text-indigo-500 flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" /> Retour au catalogue
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="hover:text-gray-900">Accueil</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <Link to="/catalog" className="hover:text-gray-900">Catalogue</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <Link to={`/catalog?category=${product.category}`} className="hover:text-gray-900">{product.category}</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    <span className="sr-only">Image {i}</span>
                    <span className="absolute inset-0 rounded-md overflow-hidden">
                      <img src={`${product.image_url}?random=${i}`} alt="" className="w-full h-full object-center object-cover" referrerPolicy="no-referrer" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden sm:aspect-w-3 sm:aspect-h-2">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-center object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">{product.price.toFixed(2)} €</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`h-5 w-5 flex-shrink-0 ${j < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} aria-hidden="true" />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
                <a href="#reviews" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {product.reviews_count} avis
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                <span className="text-sm text-gray-600">
                  {product.stock > 0 ? `En stock (${product.stock} disponibles)` : 'Rupture de stock'}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-700 focus:outline-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-16 text-center border-none focus:ring-0 p-0 text-gray-900 font-medium"
                  value={quantity}
                  readOnly
                />
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-700 focus:outline-none"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ajouter au panier
              </button>

              <button
                type="button"
                className="p-3 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Heart className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Ajouter aux favoris</span>
              </button>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Truck className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Livraison Numérique Rapide</h4>
                    <p className="mt-1 text-sm text-gray-500">Fichiers livrés par email ou lien sécurisé</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Satisfaction Garantie</h4>
                    <p className="mt-1 text-sm text-gray-500">Révisions incluses jusqu'à validation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
