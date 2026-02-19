import api from '../api/api'

let cachedProducts = []

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products')
    const dbProducts = response.data

    cachedProducts = dbProducts.map((p) => ({
      id: p._id,
      name: p.name,
      description: p.description,
      buyPrice: p.buyPrice ? `₹${p.buyPrice}` : 'N/A',
      rentPrice: p.rentPrice ? `₹${p.rentPrice}/day` : 'N/A',
      safetyDeposit: p.safetyDeposit ? `₹${p.safetyDeposit}` : 'N/A',
      discount: p.discount ? `-${p.discount}%` : '',
      image: p.image && p.image.url ? p.image.url : '',
      stock: p.stock || 0,
    }))

    return cachedProducts
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return []
  }
}

export const getProducts = () => {
  return cachedProducts
}
