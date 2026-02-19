import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts, fetchProducts } from '../services/service'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import defaultImg from '../assets/people waiting.avif'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/api'

export default function Buy() {
  const { id } = useParams()
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

  // find product from service using id
  const products = getProducts()
  const found = products.find((p) => p.id === id)
  const product = found
    ? { id: found.id, title: found.name, buyNew: found.buyPrice, buyOld: undefined, img: found.image, discount: found.discount }
    : { id, title: 'Product', buyNew: '₹0', buyOld: '—', img: defaultImg }

  const priceNumber = parseFloat((product.buyNew || '0').replace(/[^0-9.]/g, '')) || 0
  const discountPercent = product.discount ? Math.abs(parseFloat(String(product.discount).replace(/[^0-9.-]/g, ''))) || 0 : 0
  const discountedUnitPrice = discountPercent > 0 && priceNumber > 0 ? +(priceNumber * (1 - discountPercent / 100)).toFixed(2) : priceNumber

  const [qty, setQty] = useState(1)
  const { getToken } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [addressLine1State, setAddressLine1State] = useState('')
  const [cityState, setCityState] = useState('')
  const [stateState, setStateState] = useState('')
  const [pincodeState, setPincodeState] = useState('')

  const increment = () => setQty((q) => q + 1)
  const decrement = () => setQty((q) => (q > 1 ? q - 1 : 1))

  const total = (discountedUnitPrice * qty).toFixed(2)

  return (
    <div className="min-h-screen text-gray-800">
      <Navbar />

      <section className="bg-[#0f4f3f] text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-2xl sm:text-4xl font-bold">Buy</h1>
        </div>
      </section>

      <main className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Service Info Banner */}
          <div className="mb-8 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 px-4 py-3 rounded-lg flex items-center gap-2 shadow-sm">
            <span className="text-orange-600 text-lg">⚠️</span>
            <p className="text-orange-700 text-sm font-medium">We currently deliver our services only in Bhopal</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: product card */}
            <div className="bg-white rounded-xl border-gray-200 border p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <div className="relative bg-gray-100 rounded-md p-4">
                      <img src={product.img || defaultImg} alt={product.title} className="w-full h-64 object-cover rounded" />
                      {product.discount && (
                        <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">{product.discount}</div>
                      )}
                    </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-[#0b3b2a]">{product.title}</h2>

                  <div className="mt-4 text-sm text-gray-600">
                    <div>
                      <span className="text-gray-500">Price</span>
                    </div>
                    <div className="mt-2">
                      {discountPercent > 0 && priceNumber > 0 ? (
                        <>
                          <span className="line-through text-gray-400 mr-2">{product.buyNew}</span>
                          <span className="text-lg font-semibold text-orange-700">₹{discountedUnitPrice.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-lg font-semibold text-orange-700">{product.buyNew}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm text-gray-600 block mb-2">Quantity</label>
                    <div className="inline-flex items-center border-gray-200 border rounded-md overflow-hidden">
                      <button type="button" onClick={decrement} className="px-4 py-2 text-lg hover:bg-gray-100 cursor-pointer">-</button>
                      <div className="px-6 py-2 bg-white">{qty}</div>
                      <button type="button" onClick={increment} className="px-4 py-2 text-lg hover:bg-gray-100 cursor-pointer">+</button>
                    </div>
                  </div>

                  <div className="mt-6 text-right">
                    <div className="text-sm text-gray-500">Total Amount</div>
                    <div className="text-xl font-bold text-orange-700">₹{total}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: delivery form */}
            <div className="bg-white rounded-xl border-gray-200 border p-8">
              <h3 className="font-semibold text-lg">Delivery Details</h3>

              <form className="mt-4 space-y-3">
                <input value={fullName} onChange={(e)=>setFullName(e.target.value)} className="w-full border-gray-200 border rounded px-3 py-2" placeholder="Full Name" />
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border-gray-200 border rounded px-3 py-2" placeholder="Email" />
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full border-gray-200 border rounded px-3 py-2" placeholder="Phone Number" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input value={addressLine1State} onChange={(e)=>setAddressLine1State(e.target.value)} className="col-span-2 border-gray-200 border rounded px-3 py-2" placeholder="Address Line 1" />
                  <input value={cityState} onChange={(e)=>setCityState(e.target.value)} className="border-gray-200 border rounded px-3 py-2" placeholder="City" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input value={stateState} onChange={(e)=>setStateState(e.target.value)} className="border-gray-200 border rounded px-3 py-2" placeholder="State" />
                  <input value={pincodeState} onChange={(e)=>setPincodeState(e.target.value)} className="sm:col-span-2 border-gray-200 border rounded px-3 py-2" placeholder="Pincode" />
                </div>

                <button type="button" onClick={async ()=>{
                  const body = {
                    productId: product.id,
                    orderType: 'buy',
                    quantity: qty,
                    fullName,
                    phone,
                    addressLine1: addressLine1State,
                    city: cityState,
                    state: stateState,
                    pincode: pincodeState,
                    finalPrice: Number((total).replace(/[^0-9.]/g,'')) || 0,
                  }
                  try {
                    const token = await getToken()
                    await api.post('/orders', body, { headers: { Authorization: `Bearer ${token}` } })
                    alert('Your request is submitted and is being processed.\nIn case of rejection, all payments will be returned\nwithin 2 working days. Thanks for choosing us.')
                  } catch (err) {
                    alert(err.response?.data?.message || 'Failed to submit order')
                  }
                }} className="w-full bg-yellow-400 text-[#794200] py-3 rounded font-semibold">Place Order</button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
