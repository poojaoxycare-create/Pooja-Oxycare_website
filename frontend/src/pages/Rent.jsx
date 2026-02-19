import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts, fetchProducts } from '../services/service'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import defaultImg from '../assets/people waiting.avif'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/api'

export default function Rent() {
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

  const products = getProducts()
  const found = products.find((p) => p.id === id)
  const product = found
    ? { id: found.id, title: found.name, rent: found.rentPrice, buyNew: found.buyPrice, img: found.image }
    : { id, title: 'Product', rent: 'Contact us', buyNew: '₹0', img: defaultImg }

  const rentPerDay = parseFloat((product.rent || '0').replace(/[^0-9.]/g, '')) || 0
  const buyPrice = parseFloat((product.buyNew || '0').replace(/[^0-9.]/g, '')) || 0

  const [days, setDays] = useState('')
  const [qty, setQty] = useState(1)
  const [error, setError] = useState('')
  const { getToken } = useAuth()

  // delivery/rental form state
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [rentStartDate, setRentStartDate] = useState('')
  const [addressLine1State, setAddressLine1State] = useState('')
  const [cityState, setCityState] = useState('')
  const [stateState, setStateState] = useState('')
  const [pincodeState, setPincodeState] = useState('')

  const incrementQty = () => setQty((q) => q + 1)
  const decrementQty = () => setQty((q) => (q > 1 ? q - 1 : 1))

  const daysNumber = Number(days) || 0
  const rentTotal = rentPerDay * daysNumber * qty
  const safetyDeposit = buyPrice * qty * 0.5
  const payableNow = rentTotal + safetyDeposit

  const confirmRental = async (e) => {
    if (!(Number(days) >= 1)) {
      setError('Please enter number of days (minimum 1)')
      return
    }
    setError('')

    const body = {
      productId: product.id,
      orderType: 'rent',
      quantity: qty,
      fullName,
      phone,
      addressLine1: addressLine1State,
      city: cityState,
      state: stateState,
      pincode: pincodeState,
      rentStartDate: rentStartDate,
      rentDays: Number(days),
      finalPrice: Number(payableNow.toFixed(2)),
    }

    try {
      const token = await getToken()
      await api.post('/orders', body, { headers: { Authorization: `Bearer ${token}` } })
      alert('Your request is submitted and is being processed.\nIn case of rejection, all payments will be returned\nwithin 2 working days. Thanks for choosing us.')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit order')
    }
  }

  return (
    <div className="min-h-screen text-gray-800">
      <Navbar />

      <section className="bg-[#0f4f3f] text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-2xl sm:text-4xl font-bold">Rent</h1>
        </div>
      </section>

      <main className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Service Info Banner */}
          <div className="mb-8 bg-linear-to-r from-orange-50 to-orange-100 border border-orange-200 px-4 py-3 rounded-lg flex items-center gap-2 shadow-sm">
            <span className="text-orange-600 text-lg">⚠️</span>
            <p className="text-orange-700 text-sm font-medium">We currently deliver our services only in Bhopal</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: product + summary */}
            <div className="bg-white rounded-xl border-gray-200 border p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <div className="bg-gray-100 rounded-md p-4">
                    <img src={product.img || defaultImg} alt={product.title} className="w-full h-64 object-cover rounded" />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-[#0b3b2a]">{product.title}</h2>

                  <div className="mt-4 text-sm text-gray-600">
                    <div>
                      <span className="text-gray-500">Rent per day</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-lg font-semibold text-orange-700">{product.rent}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm text-gray-600 block mb-2">Quantity</label>
                    <div className="inline-flex items-center border-gray-200 border rounded-md overflow-hidden">
                      <button type="button" onClick={decrementQty} className="px-4 py-2 text-lg hover:bg-gray-100 cursor-pointer">-</button>
                      <div className="px-6 py-2 bg-white">{qty}</div>
                      <button type="button" onClick={incrementQty} className="px-4 py-2 text-lg hover:bg-gray-100 cursor-pointer">+</button>
                    </div>
                  </div>

                  <div className="mt-6 text-right space-y-1">
                    <div className="text-sm text-gray-500">Rent Total</div>
                    <div className="text-base font-semibold">₹{rentTotal.toFixed(2)}</div>

                    <div className="text-sm text-gray-500">Safety Deposit (50%)</div>
                    <div className="text-base">₹{safetyDeposit.toFixed(2)}</div>

                    <hr className="my-2" />
                    <div className="text-sm text-gray-500">Payable Now</div>
                    <div className="text-xl font-bold text-orange-700">₹{payableNow.toFixed(2)}</div>
                  </div>

                  <p className="text-xs text-gray-400 mt-3">* Safety deposit is fully refundable after product return.</p>
                </div>
              </div>

              {/* number of days control moved to the rental form on the right */}
            </div>

            {/* Right: rental form */}
            <div className="bg-white rounded-xl border-gray-200 border p-8">
              <h3 className="font-semibold text-lg">Rental Details</h3>

              <form className="mt-4 space-y-3">
                <input value={fullName} onChange={(e)=>setFullName(e.target.value)} className="w-full border-gray-200 border rounded px-3 py-2" placeholder="Full Name" />
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border-gray-200 border rounded px-3 py-2" placeholder="Email" />
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full border-gray-200 border rounded px-3 py-2" placeholder="Phone Number" />

                <label className="text-sm text-gray-600">Start date</label>
                <input value={rentStartDate} onChange={(e)=>setRentStartDate(e.target.value)} type="date" className="w-full border-gray-200 border rounded px-3 py-2" />

                <label className="text-sm text-gray-600">Number of days</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => {
                    const v = e.target.value
                    // allow empty string (no prefill)
                    if (v === '') return setDays('')
                    // coerce negative to 0
                    setDays(Math.max(0, Number(v)))
                  }}
                  className="w-full border-gray-200 border rounded px-3 py-2"
                />
                {error && <div className="text-red-600 text-sm mt-1">{error}</div>}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input value={addressLine1State} onChange={(e)=>setAddressLine1State(e.target.value)} className="col-span-2 border-gray-200 border rounded px-3 py-2" placeholder="Address Line 1" />
                  <input value={cityState} onChange={(e)=>setCityState(e.target.value)} className="border-gray-200 border rounded px-3 py-2" placeholder="City" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input value={stateState} onChange={(e)=>setStateState(e.target.value)} className="border-gray-200 border rounded px-3 py-2" placeholder="State" />
                  <input value={pincodeState} onChange={(e)=>setPincodeState(e.target.value)} className="sm:col-span-2 border-gray-200 border rounded px-3 py-2" placeholder="Pincode" />
                </div>

                <button type="button" onClick={confirmRental} className="w-full bg-yellow-400 text-[#794200] py-3 rounded font-semibold">Confirm Rental</button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
