import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ShopCard from '../components/ShopCard'
import { fetchProducts } from '../services/service'
import heroImg from '../assets/people waiting.avif'
import { useNavigate } from 'react-router-dom'

export default function Shop() {
  const [allProducts, setAllProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts()
      setAllProducts(data)
    }
    loadProducts()
  }, [])

  // adapt products shape for ShopCard
  const products = allProducts.map((p) => ({
    id: p.id,
    // only set badge when a discount exists; do not show anything otherwise
    badge: p.discount || '',
    img: p.image || heroImg,
    title: p.name,
    buyOld: p.buyPrice === 'Contact us' ? '—' : undefined,
    buyNew: p.buyPrice,
    rent: p.rentPrice,
    description: p.description,
  }))

  const handleBuy = (product) => {
    navigate(`/buy/${product.id}`, { state: { product } })
  }
  const handleRent = (product) => {
    navigate(`/rent/${product.id}`, { state: { product } })
  }
  const handleInfo = (product) => {
    navigate(`/product/${product.id}`, { state: { product } })
  }

  return (
    <div className="min-h-screen text-gray-800">
      <Navbar />

      <section className="bg-[#2f5b4f] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold">Shop</h1>
          <p className="mt-4 text-gray-200 max-w-2xl">Browse our wide selection of premium medical equipment available for purchase. Find the perfect devices to meet your healthcare needs with our quality products and affordable pricing.</p>
        </div>
      </section>

      <main className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ShopCard
                key={p.id}
                badge={p.badge}
                img={p.img}
                title={p.title}
                buyOld={p.buyOld}
                buyNew={p.buyNew}
                rent={p.rent}
                onBuy={() => handleBuy(p)}
                onRent={() => handleRent(p)}
                onInfo={() => handleInfo(p)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
