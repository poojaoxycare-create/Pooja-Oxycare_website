import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { getProductById, updateProduct } from '../api/api'

const EditProduct = () => {
  const { id } = useParams()
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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
  const [currentImage, setCurrentImage] = useState(null)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await getProductById(id)
      const product = response.data

      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        stock: product.stock || '0',
        buyPrice: product.buyPrice || '',
        rentPrice: product.rentPrice || '',
        safetyDeposit: product.safetyDeposit || '0',
        discount: product.discount || '0',
      })
      setCurrentImage(product.image)
    } catch (err) {
      setError('Failed to fetch product')

    } finally {
      setLoading(false)
    }
  }

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

    try {
      setSaving(true)
      const token = await getToken()

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

      await updateProduct(id, data, token)
      alert('Product updated successfully')
      navigate('/admin/products')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product')

    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading product...</div>
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
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
          {currentImage && currentImage.url && (
            <div className="mb-3">
              <img
                src={currentImage.url}
                alt="Current"
                className="h-32 w-32 object-cover rounded"
              />
              <p className="text-xs text-gray-500 mt-1">Current image</p>
            </div>
          )}
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
            disabled={saving}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {saving ? 'Saving...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
