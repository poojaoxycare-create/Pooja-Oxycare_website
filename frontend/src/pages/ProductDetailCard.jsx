import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getProducts, fetchProducts } from '../services/service'
import productImg from "../assets/Prod1.webp";
import { FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";

export default function ProductDetailCard() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      const cachedProducts = getProducts()
      if (cachedProducts.length === 0) {
        await fetchProducts()
      }
      setLoading(false)
    }
    loadProducts()
  }, [])

  // prefer navigation state, but merge missing fields from central products list
  const navProduct = location.state?.product
  const products = getProducts()
  const found = products.find((p) => p.id === id)

  const product = (() => {
    if (navProduct && found) {
      return {
        id: navProduct.id || found.id,
        title: navProduct.title || navProduct.name || found.name,
        buyNew: navProduct.buyNew || navProduct.buyPrice || found.buyPrice,
        rent: navProduct.rent || navProduct.rentPrice || found.rentPrice,
        safety: navProduct.safety || navProduct.safetyDeposit || found.safetyDeposit,
        img: navProduct.img || found.image,
        description: navProduct.description || found.description,
        discount: navProduct.discount || found.discount || '',
      }
    }

    if (navProduct) {
      return {
        id: navProduct.id,
        title: navProduct.title || navProduct.name,
        buyNew: navProduct.buyNew || navProduct.buyPrice,
        rent: navProduct.rent || navProduct.rentPrice,
        safety: navProduct.safety || navProduct.safetyDeposit,
        img: navProduct.img,
        description: navProduct.description,
        discount: navProduct.discount || '',
      }
    }

    if (found) {
      return {
        id: found.id,
        title: found.name,
        buyNew: found.buyPrice,
        rent: found.rentPrice,
        safety: found.safetyDeposit,
        img: found.image,
        description: found.description,
        discount: found.discount || '',
      }
    }

    return { id, title: "Oxygen Concentrator 5L", buyNew: "₹45,000", rent: "₹3,000 / month", safety: "₹10,000", img: productImg, description: "High-quality oxygen concentrator suitable for home and clinical use. Provides continuous oxygen supply with low noise and high efficiency.", discount: '' }
  })()

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-md border-gray-200 border grid md:grid-cols-2 gap-6 p-6">

        {/* Image Section */}
        <div className="relative flex items-center justify-center bg-gray-50 rounded-xl">
          <img
            src={product.img || productImg}
            alt={product.title}
            className="w-full max-w-sm object-contain"
          />
          {product.discount && (
            <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">{product.discount}</div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-4">

          {/* Product Name */}
          <h1 className="text-2xl font-semibold text-gray-800">{product.title}</h1>

          {/* Prices */}
                  <div className="flex flex-col gap-1 text-sm text-gray-700">
                    { /* compute numeric prices and discount */ }
                    {
                      (() => {
                        const buyRaw = String(product.buyNew || '')
                        const priceNumber = parseFloat(buyRaw.replace(/[^0-9.]/g, '')) || 0
                        const discountPercent = product.discount ? Math.abs(parseFloat(String(product.discount).replace(/[^0-9.-]/g, ''))) || 0 : 0
                        const discountedUnitPrice = discountPercent > 0 && priceNumber > 0 ? +(priceNumber * (1 - discountPercent / 100)).toFixed(2) : priceNumber

                        return (
                          <>
                            <p className="flex items-center gap-1">
                              <MdOutlineCurrencyRupee />
                              <span className="font-semibold">Buy:</span>
                              {discountPercent > 0 && priceNumber > 0 ? (
                                <>
                                  <span className="line-through text-gray-400 ml-2">{product.buyNew}</span>
                                  <span className="text-gray-800 font-semibold ml-2">₹{discountedUnitPrice.toFixed(2)}</span>
                                </>
                              ) : (
                                <span className="text-gray-800 font-semibold ml-2">{product.buyNew}</span>
                              )}
                            </p>

                            <p className="flex items-center gap-1">
                              <MdOutlineCurrencyRupee />
                              <span className="font-semibold">Rent:</span>
                              <span className="ml-2">{product.rent}</span>
                            </p>

                            <p className="flex items-center gap-1">
                              <MdOutlineCurrencyRupee />
                              <span className="font-semibold">Safety Deposit:</span>
                              <span className="ml-2">{product.safety || '—'}</span>
                            </p>
                          </>
                        )
                      })()
                    }
                  </div>

          {/* Availability */}
          <span className="text-green-600 text-sm font-medium">● In Stock</span>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">

            <button onClick={() => navigate(`/buy/${product.id}`, { state: { product } })} className="flex items-center justify-center gap-2 bg-[#0b3b2a] text-white px-5 py-3 rounded text-sm font-medium">
              <FaShoppingCart />
              Buy Now
            </button>

            <button onClick={() => navigate(`/rent/${product.id}`, { state: { product } })} className="flex items-center justify-center gap-2 bg-yellow-400 text-[#794200] px-5 py-3 rounded text-sm font-medium">
              Rent Now
            </button>

            <button onClick={() => window.location.href = 'tel:+917748905785'} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded text-sm font-medium">
              <FaPhoneAlt />
              Call Now
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}
