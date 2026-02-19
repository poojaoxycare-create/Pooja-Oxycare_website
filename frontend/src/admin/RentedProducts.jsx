import React, { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { getRentedOrders } from '../api/api'

const RentedProducts = () => {
  const { getToken } = useAuth()
  const [rentedOrders, setRentedOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRentedOrders()
  }, [])

  const fetchRentedOrders = async () => {
    try {
      setLoading(true)
      const token = await getToken()
      const resp = await getRentedOrders(token)
      setRentedOrders(resp.data)
    } catch (err) {
      console.error("Failed to fetch rented orders:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Rented Products</h2>
        <p className="text-sm text-gray-500">Track active and expired rentals</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading rented products...</p>
      ) : rentedOrders.length === 0 ? (
        <p className="text-center text-gray-500">No active rentals</p>
      ) : (
        <div className="bg-white rounded shadow-sm p-4 overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="p-3">Product Name</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Rent Start Date</th>
                <th className="p-3">Rent End Date</th>
                <th className="p-3">Days</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rentedOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-medium">{order.productSnapshot?.productName || 'N/A'}</div>
                  </td>
                  <td className="p-3">{order.fullName}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">{formatDate(order.rentStartDate)}</td>
                  <td className="p-3">{formatDate(order.rentEndDate)}</td>
                  <td className="p-3">{order.rentDays} days</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                        order.isExpired
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {order.isExpired ? 'Expired' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default RentedProducts
