import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ShoppingCart, ArrowLeft, Star, Check, Plus, Minus, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProduct } from "../contexts/ProductContext"
import { useLocalStorage } from '../contexts/LocalStorageContext'
import { useViewerCount } from '../hooks/useViewerCount';

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [showAdded, setShowAdded] = useState(false)
  const { getProductById, data } = useProduct()
  const { addToCart, isInCart, getItemQuantity } = useLocalStorage()

  const viewerCount = useViewerCount(id, user?.uid)
  const handleAddToCart = () => {
    if (!user) {
      navigate('/login')
      return
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }

    setShowAdded(true)
    setTimeout(() => {
      setShowAdded(false)
      setQuantity(1)
    }, 2000)
  }

  useEffect(() => {
    const fetchProduct = () => {
      try {
        setLoading(true)
        const productData = getProductById(id)
        setProduct(productData)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    if (data.length > 0) {
      fetchProduct()
    }
  }, [id, data, getProductById])

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Product not found</div>
      </div>
    )
  }

  const inCart = isInCart(product.id)
  const cartQuantity = getItemQuantity(product.id)


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 hover:text-blue-500 hover:underline text-gray-600 mb-6 transition"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>
      {viewerCount > 0 && (
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg w-fit mb-4">
          <Eye size={18} />
          <span className="text-sm font-medium">
            {viewerCount} {viewerCount === 1 ? 'person' : 'people'} viewing this product
          </span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center relative">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 max-w-full object-contain"
            />
            {inCart && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 font-semibold">
                <Check size={18} />
                {cartQuantity} in Cart
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full w-fit mb-4">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-gray-700 font-medium">
                    {product.rating.rate}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  ({product.rating.count} reviews)
                </span>
              </div>
            )}

            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition font-semibold flex items-center justify-center"
                >
                  <Minus size={18} />
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition font-semibold flex items-center justify-center"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`${showAdded
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
                } text-white px-8 py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 text-lg font-semibold`}
            >
              {showAdded ? (
                <>
                  <Check size={24} />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart size={24} />
                  Add to Cart
                </>
              )}
            </button>

            {!user && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Please login to add items to cart
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails