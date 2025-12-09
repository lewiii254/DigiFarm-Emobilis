import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'

const Marketplace = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    min_price: '',
    max_price: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const demoProducts = [
    {
      id: 'demo-1',
      title: 'Tomato Seeds - Hybrid F1',
      description: 'High-germination hybrid tomato seeds; disease tolerant and early maturing.',
      price: 520,
      stock: 120,
      images: [{ image: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=800&q=80' }]
    },
    {
      id: 'demo-2',
      title: 'NPK 20-10-10 Fertilizer',
      description: 'Balanced NPK fertilizer for leafy greens and cereals; improves vigor and yield.',
      price: 2450,
      stock: 80,
      images: [{ image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80' }]
    },
    {
      id: 'demo-3',
      title: 'Neem Oil Insecticide',
      description: 'Organic pest control for aphids and whiteflies; safe pre-harvest interval.',
      price: 1150,
      stock: 65,
      images: [{ image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80' }]
    },
    {
      id: 'demo-4',
      title: 'Drip Irrigation Starter Kit',
      description: 'Complete 100m drip kit with emitters; water-efficient irrigation for smallholders.',
      price: 14990,
      stock: 15,
      images: [{ image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80' }]
    }
  ]

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)
      if (filters.category) params.append('category', filters.category)
      if (filters.min_price) params.append('min_price', filters.min_price)
      if (filters.max_price) params.append('max_price', filters.max_price)

      const response = await api.get(`/marketplace/products/?${params}`)
      const data = response.data.results || response.data || []
      setProducts(data.length ? data : demoProducts)
    } catch (error) {
      toast.error('Failed to load products, showing demo catalog')
      setProducts(demoProducts)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Marketplace</h1>

      <div className="mb-6 space-y-4 md:flex md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search products..."
          className="input-field flex-1"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="input-field w-full md:w-32"
          value={filters.min_price}
          onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="input-field w-full md:w-32"
          value={filters.max_price}
          onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/marketplace/product/${product.id}`}
            className="card hover:shadow-lg transition-shadow"
          >
            {product.images?.[0] && (
              <img
                src={product.images[0].image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-bold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            <p className="text-2xl font-bold text-primary-600">KES {product.price}</p>
            <p className="text-sm text-gray-500 mt-2">Stock: {product.stock}</p>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  )
}

export default Marketplace

