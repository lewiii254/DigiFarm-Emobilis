import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    farms: 0,
    diagnoses: 0,
    orders: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [farmsRes, diagnosesRes, ordersRes] = await Promise.all([
        api.get('/farms/my_farms/'),
        api.get('/diagnosis/upload/'),
        api.get('/marketplace/orders/'),
      ])
      
      setStats({
        farms: farmsRes.data.length,
        diagnoses: diagnosesRes.data.length,
        orders: ordersRes.data.length,
      })
    } catch (error) {
      toast.error('Failed to load statistics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">My Farms</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.farms}</p>
          <Link to="/farms" className="text-primary-600 hover:underline mt-2 inline-block">
            View Farms →
          </Link>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Crop Diagnoses</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.diagnoses}</p>
          <Link to="/diagnosis" className="text-primary-600 hover:underline mt-2 inline-block">
            New Diagnosis →
          </Link>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Orders</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.orders}</p>
          <Link to="/marketplace" className="text-primary-600 hover:underline mt-2 inline-block">
            Browse Marketplace →
          </Link>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/diagnosis" className="btn-primary text-center py-4">
            🔍 Diagnose Crop Issue
          </Link>
          <Link to="/marketplace" className="btn-secondary text-center py-4">
            🛒 Browse Products
          </Link>
          <Link to="/knowledge" className="btn-secondary text-center py-4">
            📚 Read Articles
          </Link>
          <Link to="/profile" className="btn-secondary text-center py-4">
            👤 Update Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

