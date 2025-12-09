import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import api from '../services/api'
import WeatherWidget from '../components/WeatherWidget'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    farms: 0,
    diagnoses: 0,
    orders: 0,
    recent_activity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // In a real app, these endpoints would exist. 
      // We'll mock the response to keep the UI working smoothly even if backend is empty.
      
      // const [farmsRes, diagnosesRes, ordersRes] = await Promise.all([
      //   api.get('/farms/my_farms/'),
      //   api.get('/diagnosis/upload/'),
      //   api.get('/marketplace/orders/'),
      // ])
      
      // Mock Data for UI demonstration
      setTimeout(() => {
        setStats({
          farms: 2,
          diagnoses: 12,
          orders: 5,
          recent_activity: [
            { id: 1, type: 'diagnosis', text: 'Diagnosed Tomato Blight', time: '2 hours ago', icon: '🔍' },
            { id: 2, type: 'order', text: 'Ordered NPK Fertilizer', time: '1 day ago', icon: '🛒' },
            { id: 3, type: 'community', text: 'Posted in "Pest Control"', time: '2 days ago', icon: '💬' },
          ]
        })
        setLoading(false)
      }, 800)
    } catch (error) {
      toast.error('Failed to load statistics')
      setLoading(false)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Good morning, <span className="text-emerald-600">{user?.first_name || user?.email?.split('@')[0]}</span>! ☀️
            </h1>
            <p className="text-gray-500 mt-1">Here's what's happening on your farm.</p>
          </div>
          <Link to="/diagnosis" className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30">
            <span>📷</span> New Diagnosis
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Overview */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {[
                { label: 'My Farms', value: stats.farms, icon: '🚜', color: 'bg-blue-50 text-blue-600', link: '/farms' },
                { label: 'Diagnoses', value: stats.diagnoses, icon: '🌿', color: 'bg-emerald-50 text-emerald-600', link: '/diagnosis' },
                { label: 'Orders', value: stats.orders, icon: '📦', color: 'bg-purple-50 text-purple-600', link: '/marketplace' },
              ].map((stat) => (
                <motion.div key={stat.label} variants={item}>
                  <Link to={stat.link} className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${stat.color}`}>
                        {stat.icon}
                      </div>
                      <span className="text-gray-400 text-xs">View</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {stats.recent_activity.map((act, i) => (
                  <div key={act.id} className="flex gap-4 items-start relative">
                    {i !== stats.recent_activity.length - 1 && (
                      <div className="absolute left-[19px] top-10 bottom-[-24px] w-0.5 bg-gray-100"></div>
                    )}
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 z-10">
                      {act.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{act.text}</p>
                      <p className="text-xs text-gray-500">{act.time}</p>
                    </div>
                  </div>
                ))}
                {stats.recent_activity.length === 0 && (
                  <p className="text-gray-500 text-sm">No recent activity.</p>
                )}
              </div>
            </motion.div>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <WeatherWidget />
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white text-center shadow-lg">
              <h3 className="font-bold text-lg mb-2">Grow your knowledge</h3>
              <p className="text-gray-300 text-sm mb-6">Discover expert guides and tips.</p>
              <Link to="/knowledge" className="inline-block w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-semibold transition-colors">
                Visit Hub
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
