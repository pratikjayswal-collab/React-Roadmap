import React, {useState} from 'react';
import { ShoppingCart, Check} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '../contexts/LocalStorageContext'
import { useAuth } from '../contexts/AuthContext'

const ProductCard = ({data}) => {
   const { addToCart, isInCart } = useLocalStorage()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showAdded, setShowAdded] = useState(false)


  const truncateText = (text, maxLength) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

   const handleAddToCart = (e) => {
    e.stopPropagation()
    
    if (!user) {
      navigate('/login')
      return
    }

    addToCart(data)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
  }

  const inCart = isInCart(data.id)


  return (
     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative bg-gray-50 h-64 flex items-center justify-center p-4">
        <img
          src={data.image}
          alt={data.title}
          className="max-h-full max-w-full object-contain"
        />
        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          {data.category}
        </span>
        {inCart && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Check size={12} /> In Cart
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3
          onClick={() => navigate(`/product/${data.id}`)}
          className="text-lg hover:cursor-pointer hover:text-blue-500 font-semibold text-gray-800 mb-2 line-clamp-2"
        >
          {truncateText(data.title, 60)}
        </h3>

        <p className="text-sm text-gray-600 mb-4 flex-grow">
          {truncateText(data.description, 100)}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${data.price}
            </span>
          </div>
          <button
            className={`${
              showAdded
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200`}
            onClick={handleAddToCart}
          >
            {showAdded ? (
              <>
                <Check size={18} />
                Added
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard