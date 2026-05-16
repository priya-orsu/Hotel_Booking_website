import React from 'react';

const ExclusiveOffers = () => {
  const offers = [
    {
      id: 1,
      discount: '60% OFF',
      title: 'Summer Escape Package',
      description: 'Enjoy a complimentary night and daily breakfast',
      expiry: 'Aug 31',
      link: '#summer-escape'
    },
    {
      id: 2,
      discount: '40% OFF',
      title: 'Family Getaway',
      description: 'Special couples package including 3D treatment',
      expiry: 'Sep 20',
      link: '#Family-getaway'
    },
    {
      id: 3,
      discount: '30% OFF',
      title: 'Early Bird Special',
      description: 'Book 60 days in advance and save on your stay at any of our luxury properties worldwide.',
      expiry: 'Aug 31',
      link: '#early-bird'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Exclusive Offers</h2>
      <p className="text-gray-600 mb-8 text-lg leading-relaxed">
        Take advantage of our limited-time offers and special packages. We enhance your stay and create unforgettable memories.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {offers.map((offer) => (
          <div 
            key={offer.id} 
            className="border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-md font-bold mb-4">
              {offer.discount}
            </span>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{offer.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{offer.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Explore {offer.expiry}</span>
              <a 
                href={offer.link} 
                className="text-blue-600 font-bold hover:underline hover:text-blue-800 transition-colors"
              >
                View Offers →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;