import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../services/api'
import toast from 'react-hot-toast'

const AddProduct = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    category: '', 
    image: null
  })
  const [categories, setCategories] = useState([])
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    api.get('/marketplace/categories/')
      .then(res => setCategories(res.data.results || res.data || []))
      .catch(err => console.error('Failed to fetch categories', err))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('price', formData.price)
    data.append('stock', formData.stock)
    data.append('category_id', formData.category || (categories[0]?.id))
    
    if (formData.image) {
      data.append('images', formData.image) 
    }

    try {
      await api.post('/marketplace/products/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      toast.success('Product listed successfully!')
      navigate('/marketplace')
    } catch (error) {
      toast.error('Failed to list product: ' + (error.response?.data?.detail || error.message))
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List New Product</h1>
          <p className="text-gray-500">Sell your seeds, tools, or harvest to thousands of farmers.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <div className="flex items-center gap-6">
                <div className={`w-32 h-32 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden ${preview ? 'border-emerald-500' : 'border-gray-300'}`}>
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-2xl">📷</span>
                  )}
                </div>
                <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors">
                  Choose Photo
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g. Hybrid Tomato Seeds"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                 <select 
                   name="category"
                   className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                   value={formData.category}
                   onChange={handleChange}
                 >
                   <option value="">Select Category</option>
                   {categories.map(cat => (
                     <option key={cat.id} value={cat.id}>{cat.name}</option>
                   ))}
                 </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                required
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Describe your product specs, quality, etc."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (KES)</label>
                <input
                  type="number"
                  name="price"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="100"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50"
              >
                {loading ? 'Listing Product...' : 'Publish Item'}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default AddProduct
