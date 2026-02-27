import React from 'react';

export default function Contact() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Contactez-nous</h2>
        <p className="mt-4 text-lg text-gray-500">
          Une question ? Un problème avec votre commande ? Notre équipe est là pour vous aider.
        </p>
        <form className="mt-8 max-w-md mx-auto grid grid-cols-1 gap-6">
          <input type="text" placeholder="Nom complet" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 border" />
          <input type="email" placeholder="Email" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 border" />
          <textarea rows={4} placeholder="Votre message" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 border"></textarea>
          <button type="submit" className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700">Envoyer</button>
        </form>
      </div>
    </div>
  );
}
