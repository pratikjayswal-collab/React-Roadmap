import React, { useState, useEffect } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle } from 'lucide-react'
import { useLocalStorage } from '../contexts/LocalStorageContext'

const SlidingCart = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal,
    getCartCount,
    addOrder,
    clearCart
  } = useLocalStorage()
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const handleCheckout = () => {
    if (cart.length === 0) return
    
    setIsProcessing(true)
    
    // Simulate order processing
    setTimeout(() => {
      // Place the order
      addOrder({
        status: 'confirmed',
        paymentMethod: 'Online Payment',
        deliveryAddress: 'Default Address'
      })
      
      setIsProcessing(false)
      setOrderSuccess(true)
      
      // Close cart and reset after showing success message
      setTimeout(() => {
        setOrderSuccess(false)
        onClose()
      }, 2000)
    }, 1000)
  }

  // Reset success state when cart is closed
  useEffect(() => {
    if (!isOpen) {
      setOrderSuccess(false)
    }
  }, [isOpen])

  return (
    <>
      {/* Invisible Overlay - for closing cart when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag size={24} className="text-blue-600" />
              <h2 className="text-xl font-bold">Your Cart</h2>
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-semibold">
                {getCartCount()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag size={64} className="mb-4 text-gray-300" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm mt-2">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-gray-50 p-3 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain bg-white rounded"
                    />
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-medium text-sm line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-blue-600 font-bold text-lg mb-2">
                        ${item.price}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-7 h-7 rounded bg-white border hover:bg-gray-100 transition flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-7 h-7 rounded bg-white border hover:bg-gray-100 transition flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && !orderSuccess && (
            <div className="border-t p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white py-3 rounded-lg font-semibold transition`}
              >
                {isProcessing ? 'Processing Order...' : 'Place Order'}
              </button>
              <button
                onClick={onClose}
                className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition"
              >
                Continue Shopping
              </button>
            </div>
          )}

          {/* Order Success Message */}
          {orderSuccess && (
            <div className="border-t p-4 bg-green-50">
              <div className="flex flex-col items-center justify-center py-6">
                <CheckCircle size={64} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  Order Placed Successfully!
                </h3>
                <p className="text-green-600 text-center">
                  Thank you for your purchase. Your order has been confirmed.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SlidingCart