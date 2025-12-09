import api from './api'

export const mpesaService = {
  initiateSTKPush: async (orderId, phone) => {
    const response = await api.post('/payments/mpesa/initiate/', {
      order_id: orderId,
      phone: phone,
    })
    return response.data
  },

  simulateWebhook: async (checkoutRequestId, resultCode = 0, receiptNumber = 'QLTEST123') => {
    const response = await api.post('/payments/mpesa/confirmation_sim/', {
      checkout_request_id: checkoutRequestId,
      result_code: resultCode,
      mpesa_receipt_number: receiptNumber,
    })
    return response.data
  },

  getTransactions: async () => {
    const response = await api.get('/payments/transactions/')
    return response.data
  },
}

