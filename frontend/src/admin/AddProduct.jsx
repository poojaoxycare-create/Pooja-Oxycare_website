import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { createProduct } from '../api/api'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    stock: '0',
    buyPrice: '',
    rentPrice: '',
    safetyDeposit: '0',
    discount: '0',
  })
  const [image, setImage] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.description || !formData.category) {
      setError('Name, description, and category are required')
      return
    }

    // Validate prices
    const buyPrice = formData.buyPrice ? Number(formData.buyPrice) : undefined
    const rentPrice = formData.rentPrice ? Number(formData.rentPrice) : undefined
    const discount = Number(formData.discount)

    if (buyPrice !== undefined && (isNaN(buyPrice) || buyPrice < 0)) {
      setError('Buy price must be a positive number')
      return
    }
    if (rentPrice !== undefined && (isNaN(rentPrice) || rentPrice < 0)) {
      setError('Rent price must be a positive number')
      return
    }
    if (isNaN(discount) || discount < 0 || discount > 100) {
      setError('Discount must be between 0 and 100')
      return
    }

    // Validate image if provided
    if (image) {
      if (!image.type.startsWith('image/')) {
        setError('Please upload a valid image file')
        return
      }
      if (image.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        return
      }
    }

    try {
      setLoading(true)
      const token = await getToken()

      if (!token) {
        setError('Failed to get authentication token. Please log in again.')
        setLoading(false)
        return
      }

      const data = new FormData()
      data.append('name', formData.name)
      data.append('description', formData.description)
      data.append('category', formData.category)
      data.append('stock', formData.stock)
      data.append('buyPrice', formData.buyPrice)
      data.append('rentPrice', formData.rentPrice)
      data.append('safetyDeposit', formData.safetyDeposit)
      data.append('discount', formData.discount)
      if (image) data.append('image', image)

      const response = await createProduct(data, token)
      alert('Product created successfully')
      navigate('/admin/products')
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to create product'
      setError(errorMsg)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Oxygen Cylinder"
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Product details..."
            rows="4"
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Category *</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g., Medical Equipment"
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              min="0"
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              min="0"
              max="100"
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700">Buy Price (₹)</label>
            <input
              type="number"
              name="buyPrice"
              value={formData.buyPrice}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Rent Price (₹/day)</label>
            <input
              type="number"
              name="rentPrice"
              value={formData.rentPrice}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700">Safety Deposit (₹)</label>
          <input
            type="number"
            name="safetyDeposit"
            value={formData.safetyDeposit}
            onChange={handleInputChange}
            min="0"
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-1 border rounded px-3 py-2"
          />
          {image && <p className="text-sm text-green-600 mt-2">✓ {image.name}</p>}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
