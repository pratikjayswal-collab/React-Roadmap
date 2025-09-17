import { createContext, useContext, useReducer, useState, useMemo } from "react";

export const CartDataContext = createContext()
export const CartUIContext = createContext()

export const initialState = {
  productList: [
    {
      "id": 1,
      "name": "Wireless Bluetooth Headphones",
      "price": 79.99,
      "stockQuantity": 25
    },
    {
      "id": 2,
      "name": "Smartphone Case",
      "price": 24.99,
      "stockQuantity": 50
    },
    {
      "id": 3,
      "name": "Portable Power Bank",
      "price": 39.99,
      "stockQuantity": 30
    },
    {
      "id": 4,
      "name": "USB-C Cable",
      "price": 12.99,
      "stockQuantity": 90
    },
    {
      "id": 5,
      "name": "Wireless Mouse",
      "price": 29.99,
      "stockQuantity": 40
    },
    {
      "id": 6,
      "name": "Mechanical Keyboard",
      "price": 89.99,
      "stockQuantity": 15
    },
    {
      "id": 7,
      "name": "4K Webcam",
      "price": 129.99,
      "stockQuantity": 20
    },
    {
      "id": 8,
      "name": "Laptop Stand",
      "price": 49.99,
      "stockQuantity": 35
    }
  ],
  cart: [],
  cartTotal: 0,
  cartItemCount: 0,
}

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const EMPTY_CART = 'EMPTY_CART'

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { productId } = action.payload
      const product = state.productList.find((item) => item.id === productId)

      if (!product || product.stockQuantity <= 0) return state

      const updatedProducts = state.productList.map((item) => item.id === productId ? { ...item, stockQuantity: item.stockQuantity - 1 } : item)

      const existingCartItem = state.cart.find((item) => item.id === productId)
      let updatedCart
      if (existingCartItem) {
        updatedCart = state.cart.map((item) => item.id === productId ? { ...item, stockQuantity: item.stockQuantity + 1 } : item)
      } else {
        updatedCart = [...state.cart, { id: product.id, name: product.name, price: product.price, stockQuantity: 1 }]
      }
      const newCartTotal = updatedCart.reduce((sum, item) => sum + (item.price * item.stockQuantity), 0)
      const newCartItemCount = updatedCart.reduce((sum, item) => sum + item.stockQuantity, 0)

      return {
        ...state,
        productList: updatedProducts,
        cart: updatedCart,
        cartTotal: newCartTotal,
        cartItemCount: newCartItemCount
      }
    }

    case "REMOVE_ITEM": {
      const { productId } = action.payload
  const cartItem = state.cart.find((item) => item.id === productId)
      if (!cartItem || cartItem.stockQuantity <= 0) return state
      const updatedProducts = state.productList.map((item) => item.id === productId ? { ...item, stockQuantity: item.stockQuantity + 1 } : item)

     let updatedCart;
  if (cartItem.stockQuantity === 1) {
    updatedCart = state.cart.filter((item) => item.id !== productId)
  } else {
    updatedCart = state.cart.map((item) => 
      item.id === productId ? { ...item, stockQuantity: item.stockQuantity - 1 } : item
    )
  }
       const newCartTotal = updatedCart.reduce((sum, item) => sum + (item.price * item.stockQuantity), 0)
      const newCartItemCount = updatedCart.reduce((sum, item) => sum + item.stockQuantity, 0)

      return {
        ...state,
        productList: updatedProducts,
        cart: updatedCart,
        cartTotal: newCartTotal,
        cartItemCount: newCartItemCount
      }
    }

    case "EMPTY_CART": {
  const updatedProducts = state.productList.map(product => {
    const cartItem = state.cart.find(item => item.id === product.id)
    return cartItem 
      ? { ...product, stockQuantity: product.stockQuantity + cartItem.stockQuantity }
      : product
  })

  return {
    ...state,
    productList: updatedProducts,
    cart: [],
    cartTotal: 0,
    cartItemCount: 0
  }
}

    default:
      return state
  }
}

export const CartDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  const actions = useMemo(() => ({
    addToCart: (productId) => {
      dispatch({ type: ADD_TO_CART, payload: { productId } })
    },
    removeItem: (productId) => {
      dispatch({ type: REMOVE_ITEM, payload: { productId } })
    },
    emptyCart: () => {
      dispatch({ type: EMPTY_CART })
    }
  }), [])

  const value = useMemo(() => ({
    productList: state.productList,
    cart: state.cart,
    cartTotal: state.cartTotal,
    cartItemCount: state.cartItemCount,
    ...actions
  }), [state, actions]);

  return (
    <CartDataContext.Provider value={value}>
      {children}
    </CartDataContext.Provider>
  )
}

export const CartUIProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => ({
    isOpen,
    setIsOpen,
    toggleCart: () => setIsOpen(prev => !prev)
  }), [isOpen]);

  return (
    <CartUIContext.Provider value={value}>
      {children}
    </CartUIContext.Provider>
  )
}

export const CartProvider = ({ children }) => {
  return (
    <CartDataProvider>
      <CartUIProvider>
        {children}
      </CartUIProvider>
    </CartDataProvider>
  )
}

export const useCartData = () => {
  const context = useContext(CartDataContext)
  if (!context) {
    throw new Error('useCartData must be used within CartDataProvider')
  }
  return context
}

export const useCartUI = () => {
  const context = useContext(CartUIContext)
  if (!context) {
    throw new Error('useCartUI must be used within CartUIProvider')
  }
  return context
}

export const useCart = () => {
  return {
    ...useCartData(),
    ...useCartUI()
  }
}