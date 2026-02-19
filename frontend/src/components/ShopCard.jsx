import React from 'react'
import defaultImg from '../assets/Prod1.webp'

export default function ShopCard({ badge, img, title, buyOld, buyNew, rent, onBuy, onRent, onInfo }) {
  const imageSrc = img || defaultImg

  return (
    <div className="bg-white rounded-xl border-gray-200 border hover:shadow-md transition overflow-hidden">
      <div className="relative">
        <img src={imageSrc} alt={title} className="w-full h-56 object-cover" />

        {badge && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
            {badge}
          </div>
        )}

        <button onClick={onInfo} className="absolute top-3 right-3 bg-white rounded-full p-1 shadow text-gray-600 w-8 h-8 flex items-center justify-center" title="info">
          <span className="text-sm font-semibold">i</span>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[#0b3b2a]">{title}</h3>

        <div className="mt-3 text-sm text-gray-600">
          <div>
            <span className="text-gray-500">Buy:</span>{' '}
            <span className="line-through text-gray-400 mr-2">{buyOld}</span>
            <span className="text-green-700 font-semibold">{buyNew}</span>
          </div>
          <div className="mt-1">Rent: <span className="text-gray-700">{rent}</span></div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={onBuy} className="w-full bg-[#0b3b2a] text-white py-2 rounded">Buy</button>
          <button onClick={onRent} className="w-full bg-yellow-400 text-[#794200] py-2 rounded">Rent</button>
        </div>
      </div>
    </div>
  )
}
