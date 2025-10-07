import React from 'react'
import { X, Package, Calendar, DollarSign, ShoppingBag } from 'lucide-react'
import { useLocalStorage } from '../contexts/LocalStorageContext'

const OrderHistory = ({ isOpen, onClose }) => {
  const { orders } = useLocalStorage()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      {/* Invisible Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center gap-2 text-white">
              <Package size={24} />
              <h2 className="text-xl font-bold">Order History</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-800 rounded-full transition text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Orders List */}
          <div className="flex-1 overflow-y-auto p-4">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Package size={64} className="mb-4 text-gray-300" />
                <p className="text-lg font-medium">No orders yet</p>
                <p className="text-sm mt-2 text-center">
                  Your order history will appear here once you make a purchase
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice().reverse().map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    {/* Order Header */}
                    <div className="flex justify-between items-start mb-3 pb-3 border-b">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Order ID</p>
                        <p className="font-semibold text-gray-800">#{order.id}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Calendar size={16} />
                      <span>{formatDate(order.date)}</span>
                    </div>

                    {/* Order Items */}
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                        <ShoppingBag size={14} />
                        Items ({order.items.length})
                      </p>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex gap-3 bg-gray-50 p-2 rounded"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 object-contain bg-white rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-600">
                                Qty: {item.quantity} × ${item.price}
                              </p>
                            </div>
                            <div className="text-sm font-semibold text-gray-800">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                        <DollarSign size={16} />
                        Total Amount
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>

                    {/* Additional Info */}
                    {order.paymentMethod && (
                      <div className="mt-2 text-xs text-gray-500">
                        Payment: {order.paymentMethod}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {orders.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              <div className="text-center text-sm text-gray-600">
                Total Orders: <span className="font-bold text-gray-800">{orders.length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default OrderHistory