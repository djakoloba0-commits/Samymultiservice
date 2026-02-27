import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck, MapPin } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = 0;
  const finalTotal = total + shippingCost;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setStep(4); // Success step
    }, 2000);
  };

  if (items.length === 0 && step !== 4) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {step === 4 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Commande confirmée !</h2>
            <p className="text-lg text-gray-600 mb-8">
              Merci pour votre achat. Votre numéro de commande est le <strong>#CMD-{Math.floor(Math.random() * 1000000)}</strong>.
              Un email de confirmation vous a été envoyé.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Retour à l'accueil
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              {/* Stepper */}
              <nav aria-label="Progress" className="mb-8">
                <ol role="list" className="flex items-center">
                  <li className={`relative pr-8 sm:pr-20 ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className={`h-0.5 w-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                    </div>
                    <button onClick={() => setStep(1)} className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-200'} hover:bg-indigo-700`}>
                      <MapPin className="h-4 w-4 text-white" />
                    </button>
                  </li>
                  <li className={`relative pr-8 sm:pr-20 ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className={`h-0.5 w-full ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                    </div>
                    <button onClick={() => setStep(2)} disabled={step < 2} className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'} hover:bg-indigo-700`}>
                      <Truck className="h-4 w-4 text-white" />
                    </button>
                  </li>
                  <li className={`relative ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                    <button onClick={() => setStep(3)} disabled={step < 3} className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'} hover:bg-indigo-700`}>
                      <CreditCard className="h-4 w-4 text-white" />
                    </button>
                  </li>
                </ol>
              </nav>

              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 sm:p-8">
                {step === 1 && (
                  <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                    <h2 className="text-xl font-medium text-gray-900 mb-6">Adresse de livraison</h2>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Prénom</label>
                        <div className="mt-1">
                          <input type="text" id="first-name" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Nom</label>
                        <div className="mt-1">
                          <input type="text" id="last-name" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border" />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                        <div className="mt-1">
                          <input type="text" id="address" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                        <div className="mt-1">
                          <input type="text" id="city" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">Code postal</label>
                        <div className="mt-1">
                          <input type="text" id="postal-code" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button type="submit" className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Continuer vers la livraison
                      </button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                    <h2 className="text-xl font-medium text-gray-900 mb-6">Mode de livraison</h2>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 border border-indigo-500 rounded-lg bg-indigo-50 cursor-pointer">
                        <input id="delivery-standard" name="delivery-method" type="radio" defaultChecked className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                        <label htmlFor="delivery-standard" className="ml-3 flex flex-col cursor-pointer">
                          <span className="block text-sm font-medium text-indigo-900">Livraison Numérique (Email)</span>
                          <span className="block text-sm text-indigo-700">Fichiers haute résolution</span>
                        </label>
                        <span className="ml-auto text-sm font-medium text-indigo-900">Gratuit</span>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button type="button" onClick={() => setStep(1)} className="text-indigo-600 hover:text-indigo-500 font-medium text-sm">
                        Retour
                      </button>
                      <button type="submit" className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Continuer vers le paiement
                      </button>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <form onSubmit={handlePayment}>
                    <h2 className="text-xl font-medium text-gray-900 mb-6">Paiement sécurisé</h2>
                    <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-900">Carte bancaire</span>
                        <div className="flex space-x-2">
                          <CreditCard className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4">
                          <label htmlFor="card-number" className="block text-xs font-medium text-gray-700">Numéro de carte</label>
                          <input type="text" id="card-number" required placeholder="0000 0000 0000 0000" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border" />
                        </div>
                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="expiration-date" className="block text-xs font-medium text-gray-700">Date d'expiration (MM/AA)</label>
                          <input type="text" id="expiration-date" required placeholder="MM/AA" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border" />
                        </div>
                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="cvc" className="block text-xs font-medium text-gray-700">CVC</label>
                          <input type="text" id="cvc" required placeholder="123" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 border" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                      <button type="button" onClick={() => setStep(2)} className="text-indigo-600 hover:text-indigo-500 font-medium text-sm">
                        Retour
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className={`bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-6 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Traitement...
                          </>
                        ) : (
                          `Payer ${finalTotal.toFixed(2)} €`
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Order summary sidebar */}
            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif</h2>
                
                <ul role="list" className="divide-y divide-gray-200 mb-6">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <img src={item.image_url} alt={item.name} className="h-16 w-16 rounded-md object-cover" referrerPolicy="no-referrer" />
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3 className="line-clamp-1">{item.name}</h3>
                            <p className="ml-4">{(item.price * item.quantity).toFixed(2)} €</p>
                          </div>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <p className="text-gray-500">Qté {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-4 border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Sous-total</dt>
                    <dd className="text-sm font-medium text-gray-900">{total.toFixed(2)} €</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Livraison</dt>
                    <dd className="text-sm font-medium text-gray-900">Gratuit</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-indigo-600">{finalTotal.toFixed(2)} €</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
