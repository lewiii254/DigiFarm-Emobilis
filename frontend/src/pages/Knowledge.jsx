import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'

const Knowledge = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const demoArticles = [
    {
      id: 'demo-1',
      slug: 'managing-early-blight',
      title: 'Managing Early Blight in Tomatoes',
      body: 'Identify brown concentric rings, remove infected leaves, apply copper fungicide, and improve spacing to reduce humidity.',
      author_name: 'Agro Team',
      publish_date: new Date().toISOString(),
      featured_image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'demo-2',
      slug: 'soil-health-biomass',
      title: 'Building Soil Health with Biomass',
      body: 'Incorporate compost, keep soil covered, and rotate with legumes to boost nitrogen and microbial life.',
      author_name: 'Soil Lab',
      publish_date: new Date().toISOString(),
      featured_image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'demo-3',
      slug: 'ipm-aphids',
      title: 'Integrated Pest Management for Aphids',
      body: 'Scout weekly, introduce beneficial insects, use neem oil at dusk, and avoid over-fertilizing with nitrogen.',
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
      toast.error('Failed to load articles, showing demo guides')
      setArticles(demoArticles)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Knowledge Hub</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/knowledge/article/${article.slug}`}
            className="card hover:shadow-lg transition-shadow"
          >
            {article.featured_image && (
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-2 line-clamp-3">{article.body.substring(0, 150)}...</p>
            <p className="text-sm text-gray-500">
              By {article.author_name} • {new Date(article.publish_date).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Knowledge

