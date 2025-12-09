import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">🌾</span>
              <span className="text-xl font-bold text-gray-800">DigiFarm Assist</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/marketplace" className="text-gray-700 hover:text-primary-600 px-3 py-2">
              Marketplace
            </Link>
            <Link to="/knowledge" className="text-gray-700 hover:text-primary-600 px-3 py-2">
              Knowledge Hub
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Dashboard
                </Link>
                <Link to="/diagnosis" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Diagnosis
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  {user?.email}
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

