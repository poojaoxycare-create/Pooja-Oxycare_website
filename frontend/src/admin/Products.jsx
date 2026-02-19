import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { getAllProducts, deleteProduct } from '../api/api'

const Products = () => {
  const { getToken } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await getAllProducts()
      setProducts(response.data)
    } catch (err) {
      // Failed to fetch products
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      const token = await getToken()
      await deleteProduct(id, token)
      alert('Product deleted')
      setProducts(products.filter((p) => p._id !== id))
    } catch (err) {
      alert('Failed to delete product')

    }
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p._id.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold">Products</h2>
          <p className="text-sm text-gray-500">Manage your product inventory</p>
        </div>

        <Link
          to="add"
          className="bg-[#0aa5ff] text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg p-6">
        <input
          placeholder="Search products by title or id..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 text-sm text-gray-600 mb-6"
        />

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div key={p._id} className="bg-white rounded-xl shadow-md border p-4">
                <div className="h-48 rounded-lg overflow-hidden bg-gray-100">
                  {p.image && p.image.url ? (
                    <img
                      src={p.image.url}
                      alt={p.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {p.description}
                  </p>

                  <div className="flex justify-between mt-4">
                    {p.buyPrice && (
                      <div>
                        <p className="text-xs text-gray-400">Buy</p>
                        <p className="font-bold">₹{p.buyPrice}</p>
                      </div>
                    )}

                    {p.rentPrice && (
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Rent/day</p>
                        <p className="font-bold">₹{p.rentPrice}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      {p.stock > 0 ? 'Active' : 'Out of Stock'}
                    </span>

                    <div className="flex gap-2">
                      <Link
                        to={`edit/${p._id}`}
                        className="px-3 py-2 bg-blue-500 text-white text-sm rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-3 py-2 bg-red-500 text-white text-sm rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
