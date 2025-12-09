import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../services/api'
import toast from 'react-hot-toast'

const Knowledge = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const demoArticles = [
    {
      id: 'demo-1',
      slug: 'managing-early-blight',
      title: 'Managing Early Blight in Tomatoes',
      category: 'Disease Control',
      body: 'Identify brown concentric rings, remove infected leaves, apply copper fungicide, and improve spacing to reduce humidity. Early blight is a common disease...',
      author_name: 'Agro Team',
      publish_date: new Date().toISOString(),
      featured_image: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d9?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'demo-2',
      slug: 'soil-health-biomass',
      title: 'Building Soil Health with Biomass',
      category: 'Soil Management',
      body: 'Incorporate compost, keep soil covered, and rotate with legumes to boost nitrogen and microbial life. Healthy soil is the foundation...',
      author_name: 'Soil Lab',
      publish_date: new Date().toISOString(),
      featured_image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'demo-3',
      slug: 'ipm-aphids',
      title: 'Integrated Pest Management for Aphids',
      category: 'Pest Control',
      body: 'Scout weekly, introduce beneficial insects, use neem oil at dusk, and avoid over-fertilizing with nitrogen. Aphids can transmit viruses...',
      author_name: 'Field Notes',
      publish_date: new Date().toISOString(),
      featured_image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=80'
    }
  ]

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await api.get('/knowledge/articles/')
      const data = response.data.results || response.data || []
      setArticles(data.length ? data : demoArticles)
    } catch (error) {
      setArticles(demoArticles)
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.body.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-teal-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">The Knowledge Hub</h1>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto mb-8">
            Expert-verified guides, localized farming tips, and agronomist insights to help you grow more with less.
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for 'pest control', 'maize', 'pricing'..."
              className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-teal-500/30 shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-5 top-4 text-2xl text-gray-400">🔍</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
              >
                <Link to={`/knowledge/article/${article.slug}`} className="flex-1 flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-800 uppercase tracking-wide">
                      {article.category || 'Guide'}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold font-serif text-gray-900 mb-3 group-hover:text-teal-700 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
                      {article.body}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold">
                          {article.author_name[0]}
                        </div>
                        <div className="text-xs">
                          <p className="font-semibold text-gray-900">{article.author_name}</p>
                          <p className="text-gray-500">{new Date(article.publish_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className="text-teal-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        Read Article →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No articles found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Video Tutorials Section */}
      <div className="bg-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold font-serif text-gray-900 mb-8 flex items-center gap-3">
             <span className="w-2 h-8 bg-teal-500 rounded-full"></span>
             Video Tutorials
           </h2>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Video 1 */}
             <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
               <div className="aspect-video">
                 <iframe 
                   width="100%" 
                   height="100%" 
                   src="https://www.youtube.com/embed/Pz5003W4CgI" 
                   title="Tomato Farming Guide" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                 ></iframe>
               </div>
               <div className="p-4">
                 <h3 className="font-bold text-lg mb-2">Tomato Farming Guide</h3>
                 <p className="text-sm text-gray-600">Expert tips on managing tomatoes effectively.</p>
               </div>
             </div>

             {/* Video 2 */}
             <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
               <div className="aspect-video">
                 <iframe 
                   width="100%" 
                   height="100%" 
                   src="https://www.youtube.com/embed/7s1xP0x55x0" 
                   title="Drip Irrigation Installation" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                 ></iframe>
               </div>
               <div className="p-4">
                 <h3 className="font-bold text-lg mb-2">Drip Irrigation Installation</h3>
                 <p className="text-sm text-gray-600">Simple guide to setting up drip lines.</p>
               </div>
             </div>

             {/* Video 3 */}
             <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
               <div className="aspect-video">
                 <iframe 
                   width="100%" 
                   height="100%" 
                   src="https://www.youtube.com/embed/x7x0x0x0" 
                   title="Maize Farming Tips" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                 ></iframe>
               </div>
               <div className="p-4">
                 <h3 className="font-bold text-lg mb-2">Maize Farming Tips</h3>
                 <p className="text-sm text-gray-600">Best practices for maize production.</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Knowledge
