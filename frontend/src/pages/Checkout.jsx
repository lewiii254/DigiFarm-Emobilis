import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { mpesaService } from '../services/mpesaService'
import api from '../services/api'
import toast from 'react-hot-toast'

const Checkout = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState({
    shipping_address: '',
    shipping_county: '',
    shipping_phone: user?.phone_number || '',
    order_items: [{ product_id: 1, quantity: 1 }], // In real app, get from cart
  })
  const [processing, setProcessing] = useState(false)
  const [order, setOrder] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    try {
      const response = await api.post('/marketplace/orders/', orderData)
      setOrder(response.data)
      toast.success('Order created! Proceed to payment')
    } catch (error) {
      toast.error('Failed to create order: ' + (error.response?.data?.error || error.message))
      setProcessing(false)
    }
  }

  const handlePayment = async () => {
    if (!order) return

    setProcessing(true)
    try {
      const result = await mpesaService.initiateSTKPush(
        order.id,
        orderData.shipping_phone
      )
      toast.success('Payment request sent! Check your phone.')
      
      // Poll for payment status
      setTimeout(() => {
        toast.success('Payment successful!')
        navigate('/dashboard')
      }, 10000) // In real app, poll the API
    } catch (error) {
      toast.error('Payment failed: ' + (error.response?.data?.error || error.message))
      setProcessing(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {!order ? (
        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Shipping Address</label>
            <textarea
              className="input-field"
              rows="3"
              value={orderData.shipping_address}
              onChange={(e) => setOrderData({ ...orderData, shipping_address: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">County</label>
            <input
              type="text"
              className="input-field"
              value={orderData.shipping_county}
              onChange={(e) => setOrderData({ ...orderData, shipping_county: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              className="input-field"
              placeholder="+254712345678"
              value={orderData.shipping_phone}
              onChange={(e) => setOrderData({ ...orderData, shipping_phone: e.target.value })}
              required
            />
          </div>
          <button type="submit" disabled={processing} className="btn-primary w-full">
            {processing ? 'Creating Order...' : 'Create Order'}
          </button>
        </form>
      ) : (
        <div className="card space-y-4">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <p>Total: KES {order.total_amount}</p>
          <button
            onClick={handlePayment}
            disabled={processing}
            className="btn-primary w-full"
          >
            {processing ? 'Processing...' : 'Pay with M-Pesa'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Checkout

