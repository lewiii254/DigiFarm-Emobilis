import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import AddProduct from './pages/AddProduct'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { CartProvider } from './context/CartContext'
import Diagnosis from './pages/Diagnosis'
import Knowledge from './pages/Knowledge'
import ArticleDetail from './pages/ArticleDetail'
import Profile from './pages/Profile'
import Community from './pages/Community'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/add" element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              } />
              <Route path="/marketplace/cart" element={<Cart />} />
              <Route path="/marketplace/product/:id" element={<ProductDetail />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/knowledge/article/:slug" element={<ArticleDetail />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/diagnosis"
                element={
                  <ProtectedRoute>
                    <Diagnosis />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/community" element={<Community />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

