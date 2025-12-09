import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import api from '../services/api'
import toast from 'react-hot-toast'

const ArticleDetail = () => {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticle()
  }, [slug])

  const fetchArticle = async () => {
    try {
      const response = await api.get(`/knowledge/articles/${slug}/`)
      setArticle(response.data)
      // Increment views
      api.post(`/knowledge/articles/${slug}/increment_views/`)
    } catch (error) {
      toast.error('Failed to load article')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!article) {
    return <div className="text-center py-12">Article not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="card">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-600 mb-6">
          By {article.author?.email} • {new Date(article.publish_date).toLocaleDateString()} • {article.views} views
        </p>
        {article.featured_image && (
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full rounded-lg mb-6"
          />
        )}
        <div className="prose max-w-none">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}

export default ArticleDetail

